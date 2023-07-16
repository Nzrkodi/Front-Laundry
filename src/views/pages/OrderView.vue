<template>
	<SideBar />
	<div id="main">
		<NavBar />

		<div class="main-content container-fluid">
			<div class="page-title">
				<div class="row">
					<div class="col-12 col-md-6 order-md-1 order-last">
						<h4>Tabel Order</h4>
						<p class="text-subtitle text-primary">
							Tabel laundry yaitu tabel dimana menampung semua data laundry client
						</p>
					</div>
					<div class="col-12 col-md-6 order-md-2 order-first">
						<nav aria-label="breadcrumb" class='breadcrumb-header'>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
								<li class="breadcrumb-item active" aria-current="page">Table</li>
							</ol>
						</nav>
					</div>
				</div>
			</div>

			<!--  Inverse table start -->
			<div class="row" id="table-inverse">
				<div class="col-12">
					<div class="card">
						<div class="card-header">
							<h4 class="card-title float-start">Data Order</h4>
							<BaseButton @event-click="showHideModal" type-button="new-data" class="float-end btn btn-primary btn-sm">
								Tambah Data</BaseButton>
						</div>
						<div class="card-body">
							<div class="dataTable-top d-flex justify-content-between mb-2">
								<div class="dataTable-dropdown">
									<select class="dataTable-selector form-select" v-model.number="meta.limit"
										@change="() => { meta.page = 1; getPayloadList(); }">
										<option value="10">10</option>
										<option value="15">15</option>
										<option value="20">20</option>
										<option value="25">25</option>
									</select><label>entries per page</label>
								</div>
								<div class="dataTable-search">
									<div class="input-group">
										<span class="input-group-text" id="basic-addon1"><font-awesome-icon icon="search" /></span>
										<input class="dataTable-input" placeholder="Search..." type="text" v-model="meta.search"
											@keyup="() => { meta.page = 1; getPayloadList() }">
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table table-light mb-0">
									<thead>
										<tr>
											<th style="width: 4%;">No</th>
											<th>Info Order</th>
											<th>Detail Order</th>
											<th style="width: 20%;">ACTION</th>
										</tr>
									</thead>
									<TransitionGroup name="table" tag="tbody">
										<tr v-for="(item, index) in payloadList" :key="index">
											<td class="text-bold-500">{{ Other.getNumber(index, meta) }}</td>
											<td >
												<div class="row">
													<h6>#{{ item.code_order }}</h6>
													<div class="col-lg">
														<strong class="text-muted">Nama Klien</strong>
													</div>
													<div class="col-lg-8">: {{ item.nama_client }}</div>
												</div>
												<div class="row mt-2">
													<div class="col-lg">
														<strong class="text-muted">Tanggal Masuk</strong>
													</div>
													<div class="col-lg-8">: {{ item.tgl_masuk }}</div>
												</div>
												<div class="row mt-2">
													<div class="col-lg">
														<strong class="text-muted">Tanggal Keluar</strong>
													</div>
													<div class="col-lg-8">: {{ item.tgl_keluar ? item.tgl_keluar : 'Belum diambil' }}</div>
												</div>
											</td>
											<td>
												<div class="row mx-1">
													<ul class="list-group list-group-flush">
														<a role="button" class="link-primary" v-for="(list, index2) in item.detail_order">
															<li class="list-group text-capitalize mt-1">
																{{ index2 + 1 }}. {{ list.keterangan }} | 
																status : {{ list.status == 0 ? 'Dalam proses' : list.status == 1 ? 'selesai' : 'dibatalkan' }}
															</li>
														</a>
													</ul>
												</div>
											</td>
											<td>
												<BaseButton :row-data="item" @event-click="setDataToForm" class="btn btn-outline-primary me-3">
													Edit</BaseButton>
												<BaseButton :data-id="item.id" @event-click="deleteConfirm" class="btn btn-outline-danger">Hapus
												</BaseButton>
											</td>
										</tr>
									</TransitionGroup>
								</table>
								<TransitionGroup name="defend" tag="div" class="d-flex justify-content-center">
									<h5 class="text-muted py-3" v-if="meta.total === 0 && meta.search.length === 0">Belum ada data dalam
										tabel ini!</h5>
									<h5 class="text-muted py-3" v-if="meta.total_in_page === 0 && meta.search.length >= 1">Data tidak
										ditemukan!</h5>
								</TransitionGroup>
							</div>
							<Transition>
								<Paggination v-show="meta.search.length <= 0 && meta.total > meta.limit" :page="meta.page"
									:total="meta.total" :limit="meta.limit" @event-click="paggination" />
							</Transition>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BaseModal md-size="modal-xl">
			<template v-slot:header>
				<h5 class="modal-title" id="exampleModalLabel">Formulir Data</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</template>
			<template v-slot:body>
				<div class="row mt-3">
					<div class="col-lg-2">
						<div class="ms-3">
							<h5>Semua order</h5>

							<ul class="list-group list-group-flush">
								<a role="button" v-for="item in 5"><li class="list-group mt-3">An item</li></a>
							</ul>
						</div>
					</div>
					<div class="col-lg mt-4">
						<div class="border-start me-3 rounded ps-5">
							<div class="d-flex justify-content-between">
								<h5 class="">Detail Order</h5>
								<BaseButton class="btn-outline-primary" @event-click="setToDetailOrder" >Tambah</BaseButton>
							</div>
							<div class="row" style="margin-top: -15px;">
								<div class="col-lg-6">
									<div class="form-group mt-3">
										<label class="form-label">Jenis</label>
										<select v-model="detailPayload.jenis_id" class="form-select">
											<option value="0" disabled selected>--pilih--</option>
										</select>
									</div>
									<div class="form-group mt-3">
										<label class="form-label">Paket</label>
										<select v-model="detailPayload.paket_id" class="form-select">
											<option value="0" disabled selected>--pilih--</option>
										</select>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group mt-3">
										<BaseInput type="number" v-model.number="detailPayload.berat" label="Berat" placeholder="--input disini--" class="mt-2"/>
									</div>
									<div class="form-group mt-3">
										<label class="form-label">Status</label>
										<select v-model="detailPayload.status" class="form-select">
											<option value="0" disabled selected>--pilih--</option>
										</select>
									</div>
								</div>
								<div class="col-lg-12">
									<div class="form-group mt-2">
										<label for="" class="form-label">Keterangan</label>
										<textarea v-model="detailPayload.keterangan" class="form-control" placeholder="--input disini--" cols="30" rows="10"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButton class="btn btn-secondary" data-bs-dismiss="modal">Batal</BaseButton>
				<BaseButton class="btn btn-primary" @event-click="upsertPayload()">Proses</BaseButton>
			</template>
		</BaseModal>

		<Footer />
	</div>
</template>
<style scoped>
.v-enter-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.table-enter-active {
	transition: all 0.3s ease;
}

.table-enter-from,
.table-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.table {
	overflow: hidden;
}

.defend-enter-active {
	transition: all 0.1s ease;
}

.defend-enter-active {
	transition-delay: 0.1s;
}

.defend-enter-from,
.defend-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.defend {
	overflow: hidden;
}
</style>
<script setup>
import BaseInput from '../component/Input/BaseInput.vue'
import Paggination from '../component/Paggination.vue';
import BaseButton from '../component/BaseButton.vue';
import BaseModal from '../component/BaseModal.vue';
import { onMounted, reactive, ref } from 'vue';
import myModal from 'bootstrap/js/dist/modal'
import SideBar from '../skelton/SideBar.vue'
import NavBar from '../skelton/NavBar.vue'
import Footer from '../skelton/Footer.vue'
import Jenis from '../../utils/Jenis'
import Other from '../../utils/Other'
import Order from '../../utils/Order'
import moment from 'moment';
import * as Yup from 'yup'

/* GET DATA FUNCTION */
const payloadList = ref([])
const meta = reactive({
	sortIcon: {
		nama: 'fa-sort',
		harga: 'fa-sort',
		created_at: 'fa-sort-up'
	},
	search: "",
	limit: 10,
	page: 1,
	total: 1,
	total_in_page: 0,
	sort: "desc",
	orderBy: "created_at"
})

const getPayloadList = () => {
	Order.getAllList(meta)
		.then((res) => {
			let item = res.data
			meta.total = item.meta.total
			meta.total_in_page = item.meta.total_in_page

			payloadList.value = item.data
		})
		.catch((err) => {
			console.log(err);
		})
}

/* SELECTED DATA FUNCTION */
const detailOrder = ref([])

const detailPayload = reactive({
	jenis_id: 0,
	paket_id: 0,
	berat: 0,
	status: 0,
	keterangan: ""
})

const setToDetailOrder = () => {
	detailOrder.value.push(detailPayload)
	for (const key in detailPayload) {
		if (typeof detailPayload[key] == 'string') {
			detailPayload[key] = ""
		} else if (typeof detailPayload[key] == 'number') {
			detailPayload[key] = 0
		}
	}
}

/* UPSERT DATA FUNCTION */
const payload = reactive({
	nama: '',
	harga: ''
})

const errorPayload = ref('');

const upsertPayload = async () => {
	try {
		const payloadSchema = Yup.object().shape({
			nama: Yup.string()
				.required('Field harus diisi')
				.min(2, 'Field minimal terdiri dari 2 karakter')
				.max(150, 'Field maksimal terdiri dari 150 karakter'),
			harga: Yup.number()
				.typeError('Field harus bertipe nomor')
				.required('Field harus diisi'),
		});

		await payloadSchema.validate(payload, { abortEarly: false });
		Jenis.upsert(payload)
			.then((res) => {
				showHideModal()
				Other.toastSuccess({
					type: "success",
					title: "Berhasil",
					msg: "Data berhasil diproses!"
				})

				getPayloadList()
			})
			.catch((err) => {
				console.log(err);
			})

	} catch (error) {
		const errorMessages = err.inner.reduce((errors, error) => {
			errors[error.path] = error.message;
			return errors;
		}, {});
		errorPayload.value = errorMessages;
	}
}

/* UPSERT DATA FUNCTION */

const setDataToForm = (params) => {
	let data = params.rowData

	for (const key in payload) {
		if (key == "created_at" && key == "updated_at") {
			continue
		}
		payload[key] = data[key]
	}
	payload.id = data.id
	showHideModal()
}

/* DELETE DATA FUNCTION */
const deleteConfirm = (params) => {
	let dataId = params.dataId

	Other.sweetAlertQuestion({
		title: "Hapus?",
		msg: "Anda tidak dapat memulihkan data setelah dihapus",
		confirmMsg: "Hapus",
		callback: () => { deletePayload(dataId) }
	})
}

const deletePayload = (dataId) => {
	Jenis.delete(dataId)
		.then((res) => {
			Other.toastSuccess({
				type: "success",
				title: "Berhasil",
				msg: "Data berhasil diproses!"
			})

			getPayloadList()
		})
		.catch((err) => {
			console.log(err);
		})
}

/* ANOTHER FUNCTION */
const paggination = (data) => {
	meta.page = data.n_page
	getPayloadList()
}

const modal = ref(null)

const showHideModal = (params) => {
	if (params && params.typeButton == 'new-data') {
		clearInput()
	}
	modal.value.show() ? modal.value.show() : modal.value.hide()
}

const sortingData = (sort, by) => {
	for (const key in meta.sortIcon) {
		if (by === (meta.sortIcon)[key]) {
			continue
		}
		(meta.sortIcon)[key] = 'fa-sort'
	}

	if (sort == 'asc') {
		meta.orderBy = by
		meta.sort = 'desc'
		meta.sortIcon[by] = 'fa-sort-up'
	} else if (sort == 'desc') {
		meta.orderBy = by
		meta.sort = 'asc'
		meta.sortIcon[by] = 'fa-sort-down'
	}

	getPayloadList()
}

const clearInput = () => {
	for (const key in payload) {
		if (typeof payload[key] == "string") {
			payload[key] = ''
		} else if (typeof payload[key] == "number") {
			payload[key] = 0
		}

		delete payload.id
	}
}

onMounted(() => {
	modal.value = new myModal('#myModal', {
		keyboard: false
	})

	getPayloadList()
})
</script>