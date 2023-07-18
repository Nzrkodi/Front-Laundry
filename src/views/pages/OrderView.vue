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
												<div class="row mt-2">
													<div class="col-lg">
														<strong class="text-muted">Status Bayar</strong>
													</div>
													<div class="col-lg-8" :class="item.total_bayar ? 'text-success' : 'text-danger'">: <font-awesome-icon :icon="item.total_bayar ? 'check' : 'xmark'" /> {{ countPrice(item.detail_order) }}</div>
												</div>
											</td>
											<td>
												<div class="row mx-1">
													<ul class="list-group list-group-flush">
														<router-link :to="{name: 'detailOrder', params: {order_id: item.id}}"><font-awesome-icon class="link-primary pe-2" icon="eye" />Lihat Detail</router-link>
														<a role="button" class="text-muted" v-for="(list, index2) in item.detail_order">
															<li class="list-group text-capitalize mt-1">
																{{ index2 + 1 }}. {{ list.keterangan }} | 
																status : {{ list.status == 0 ? 'Dalam proses' : list.status == 1 ? 'selesai' : 'dibatalkan' }}
															</li>
														</a>
														<div class="mt-3">
															<BaseButton v-if="!allStatusOne(item.detail_order)" @event-click="changeStatus" :row-data="item.detail_order" class="btn-sm btn-outline-success" >Cek Selesai</BaseButton>
														</div>
													</ul>
												</div>
											</td>
											<td>
												<BaseButton v-if="!item.total_bayar" @event-click="showHideModalPayment" type-button="new-data" :data-id="item.id" :row-data="{bayar: countPrice(item.detail_order)}" class="btn btn-outline-success me-3">
													Payment</BaseButton>
													<BaseButton v-if="item.total_bayar && !item.tgl_keluar" @event-click="editPayload" :data-id="item.id" :disabled="allStatusOne(item.detail_order) ? false : true" type-button="new-data" class="btn btn-info me-3">
													Ambil</BaseButton>
													<span class="me-4 fs-6 text-success" v-if="item.tgl_keluar">Diambil</span>
												<BaseButton @event-click="deletePayload" :data-id="item.id" class="btn btn-outline-danger">Hapus
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
				<div class="row mt-3 mb-3">
					<div class="col-lg-2">
						<div class="ms-3">
							<h5>Semua order</h5>

							<ul class="list-group list-group-flush">
								<a role="button" v-for="(item, index) in detailOrder" :key="index"><li class="list-group mt-3">
									<div class="d-flex justify-content-between">
										<span class="">{{ item.keterangan }}</span>
										<BaseButton @event-click="deleteFromList" :data-id="index" class="btn-close btn-sm"></BaseButton>
									</div>
								</li></a>
							</ul>
						</div>
					</div>
					<div class="col-lg">
						<div class="border-start me-3 rounded ps-5">
							<div class="d-flex justify-content-between">
								<h5 class="">Detail Order</h5>
								<BaseButton class="btn-outline-primary" @event-click="setToDetailOrder" >Tambah</BaseButton>
							</div>
							<div class="row" style="margin-top: -15px;">
								<div class="col-lg-12">
									<div class="form-group mt-3">
										<label class="form-label">Klien</label>
										<select :disabled="detailOrder.length >= 1 ? true : false" v-model="payload.client_id" class="form-select">
											<option value="0" disabled selected>--pilih--</option>
											<option v-for="(item, index) in clientList" :key="index" :value="item.id">{{ item.nama }}</option>
										</select>
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group mt-3">
										<label class="form-label">Jenis Cucian</label>
										<select v-model.number="detailPayload.jenis_id" class="form-select">
											<option :value="0" selected>Kiloan</option>
											<option v-for="(item, index) in jenisList" :key="index" :value="item.id">{{ item.nama }}</option>
										</select>
									</div>
									<div class="form-group mt-3">
										<label class="form-label">Paket Cucian</label>
										<select v-model="detailPayload.paket_id" class="form-select">
											<option value="0" disabled selected>--pilih--</option>
											<option v-for="(item, index) in paketList" :key="index" :value="item.id">{{ item.nama }}</option>
										</select>
									</div>
									<div class="form-group mt-3">
										<BaseInput :disabled="detailPayload.jenis_id ? true : false" v-model.number="detailPayload.berat" label="Berat" class="mt-2" type="number" placeholder="--input disini--" />
									</div>
								</div>
								<div class="col-lg-6">
									<div class="form-group mt-3">
										<label for="" class="form-label">Keterangan</label>
										<textarea v-model="detailPayload.keterangan" class="form-control" placeholder="--input disini--" cols="30" rows="9"></textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButton class="btn btn-secondary" data-bs-dismiss="modal">Batal</BaseButton>
				<BaseButton :disabled="detailOrder.length >= 1 ? false : true" class="btn btn-primary" @event-click="upsertPayload('new')">Proses</BaseButton>
			</template>
		</BaseModal>

		<BaseModal md-size="modal-lg" id-modal="modalPayment">
			<template v-slot:header>
				<h5 class="modal-title" id="exampleModalLabel">Pembayaran</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</template>
			<template v-slot:body>
				<div class="row p3">
					<div class="form-group py-2">
						<h5>Jumlah Yang Harus Dibayar: {{ paymentInfo }}</h5>
					</div>
					<div class="form-group">
						<BaseInput v-model.number="paymentPayload.t_uang" label="Total Bayar" type="number" class="mt-1" placeholder="--masukan disini--" />
					</div>
					<div class="form-group mt-3">
						<label for="" class="form-label">Keterangan</label>
						<textarea v-model="paymentPayload.keterangan" cols="30" rows="10" class="form-control" placeholder="--input disini--"></textarea>
					</div>
				</div>
			</template>
			<template v-slot:footer>
				<BaseButton class="btn btn-secondary" data-bs-dismiss="modal">Batal</BaseButton>
				<BaseButton :disabled="paymentPayload.t_uang >= 1 && paymentPayload.keterangan.length >= 1 && parseInt(paymentInfo) <= paymentPayload.t_uang ? false : true" 
					class="btn btn-primary" @event-click="insertPayment()">Proses</BaseButton>
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
import Payment from '../../utils/Payment'
import Client from '../../utils/Client'
import Jenis from '../../utils/Jenis'
import Paket from '../../utils/Paket'
import Other from '../../utils/Other'
import Order from '../../utils/Order'
import Detail from '../../utils/Detail'
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
	detailOrder.value.push({
		jenis_id: detailPayload.jenis_id,
		paket_id: detailPayload.paket_id,
		berat: detailPayload.berat,
		status: detailPayload.status,
		keterangan: detailPayload.keterangan
	})
}

const deleteFromList = (params) => {
	let dataId = params.dataId

	detailOrder.value.splice(dataId, 1)
}

/* GET JENIS FUNCTION */
const jenisList = ref([])
const jenisMeta = reactive({
	search        : "",
	limit         : 100,
	page          : 1,
	total         : 1,
	total_in_page : 0,
	sort          : "desc",
	orderBy       : "created_at"
})

const getJenis = () => {
	Jenis.getAllList(jenisMeta)
	.then((res) => {
		let item = res.data
		jenisMeta.total         = item.meta.total
		jenisMeta.total_in_page = item.meta.total_in_page

		jenisList.value = item.data
	})
	.catch((err) => {
		console.log(err);
	})
}

const editPayload = (params) => {
	let dataId = params.dataId

	Other.sweetAlertQuestion({
		title: "Ambil Order",
		msg: "Ambil orderan sekarang?",
		confirmMsg: "Ambil",
		callback: () => {
			Order.setStatus(dataId)
			.then((res) => {
				Other.toastSuccess({
					type : "success",
					title: "Berhasil",
					msg  : "Order telah diambil!"
				})

				getPayloadList()
			})
			.catch((err) => {
				console.log(err);
			})
		}
	})
}

/* UPSERT ORDER FUNCTION */
const payload = reactive({
	client_id    : 0,
	pegawai_id   : 1,
	detail_order : []
})

const upsertPayload = (params) => {
	payload.detail_order = detailOrder.value

	Order.upsert(payload)
	.then((res) => {
		Other.toastSuccess({
			type : "success",
			title: "Berhasil",
			msg  : "Data berhasil diproses!"
		})

		if (params == 'new') {
			showHideModal()
		}
		getPayloadList()
	})
	.catch((err) => {
		console.log(err);
	})
}

const deletePayload = (params) => {
	Other.sweetAlertQuestion({
		title      : "Hapus?",
		msg        : "Anda tidak dapat memulihkan data setelah dihapus",
		confirmMsg : "Hapus",
		callback   : () => {
			Order.delete(params.dataId)
			.then((res) => {
				Other.toastSuccess({
					type : "success",
					title: "Berhasil",
					msg  : "Data berhasil dihapus!"
				})

				getPayloadList()
			})
			.catch((err) => {
				console.log(err);
			})
		}
	})
}

/* UPSERT PAYMENT FUNCTION */
const paymentInfo = ref("")

const paymentPayload = reactive({
	order_id  : 0,
	t_uang    : 0,
	status    : "Sudah Bayar",
	keterangan: ""
})

const insertPayment = () => {
	Payment.upsert(paymentPayload)
	.then((res) => {
		showHideModalPayment()

		paymentPayload.t_uang = ""
		paymentPayload.keterangan = ""

		Other.toastSuccess({
			type : "success",
			title: "Berhasil",
			msg  : "Pembayaran berhasil!"
		})

		getPayloadList()
	})
	.then((err) => {
		console.log(err);
	})
}

const allStatusOne = (array) => {
	return array.every(item => item.status == "1")
};

const statusPayload = reactive({
	id        : 0,
	order_id  : 0,
	jenis_id  : 0,
	paket_id  : 0,
	berat     : 20,
	harga     : 20000,
	status    : "1",
	keterangan: ""
})

const changeStatus = (params) => {
	let rowData = params.rowData

	Other.sweetAlertQuestion({
		title: "Konfirmasi selesai?",
		msg: "Konfirmasi pencucian telah selesai",
		confirmMsg: "Selesai",
		callback: () => {
			for (const key in rowData) {
				for (const item in rowData[key]) {
					if (item == 'created_at' || item == 'updated_at' || item == 'status') {
						continue
					}
					statusPayload[item] = rowData[key][item]
				}
				Detail.upsert(statusPayload)
				.then((res) => {
					Other.toastSuccess({
						type : "success",
						title: "Berhasil",
						msg  : "Update berhasil!"
					})

					getPayloadList()
				})
				.catch((err) => {
					console.log(err);
				})
			}
		}
	})
}

/* GET PAKET FUNCTION */
const paketList = ref([])
const paketMeta = reactive({
	search        : "",
	limit         : 100,
	page          : 1,
	total         : 1,
	total_in_page : 0,
	sort          : "desc",
	orderBy       : "created_at"
})

const getPaket = () => {
	Paket.getAllList(paketMeta)
	.then((res) => {
		let item = res.data
		paketMeta.total         = item.meta.total
		paketMeta.total_in_page = item.meta.total_in_page

		paketList.value = item.data
	})
	.catch((err) => {
		console.log(err);
	})
}

/* GET CLIENT FUNCTION */
const clientList = ref([])
const clientMeta = reactive({
	search        : "",
	limit         : 100,
	page          : 1,
	total         : 1,
	total_in_page : 0,
	sort          : "desc",
	orderBy       : "created_at"
})

const getClient = () => {
	Client.getAllList(clientMeta)
	.then((res) => {
		let item = res.data
		clientMeta.total         = item.meta.total
		clientMeta.total_in_page = item.meta.total_in_page

		clientList.value = item.data
	})
	.catch((err) => {
		console.log(err);
	})
}

/* ANOTHER FUNCTION */
const countPrice = (arr) => {
	return arr.reduce((accumulator, item) => accumulator + item.harga, 0);
}

const paggination = (data) => {
	meta.page = data.n_page
	getPayloadList()
}

const modal        = ref(null)
const modalPayment = ref(null)

const showHideModal = (params) => {
	if (params && params.typeButton == 'new-data') {
		clearInput()
	}
	modal.value.show() ? modal.value.show() : modal.value.hide()
}

const showHideModalPayment = (params) => {
	
	if (params && params.typeButton == 'new-data') {
		// clearInput()
		paymentInfo.value       = params.rowData.bayar
		paymentPayload.order_id = params.dataId
	}


	modalPayment.value.show() ? modalPayment.value.show() : modalPayment.value.hide()
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
		if (key == "pegawai_id") {
			continue
		}

		if (typeof payload[key] == "string") {
			payload[key] = ''
		} else if (typeof payload[key] == "number") {
			payload[key] = 0
		}

		payload.detail_order = []
		detailOrder.value = []

		delete payload.id
		delete payload.tgl_keluar
	}

	for (const key in detailPayload) {
		if (typeof detailPayload[key] == "string") {
			detailPayload[key] = ''
		} else if (typeof detailPayload[key] == "number") {
			detailPayload[key] = 0
		}
	}
}

onMounted(() => {
	modal.value = new myModal('#myModal', {
		keyboard: false
	})

	modalPayment.value = new myModal('#modalPayment', {
		keyboard: false
	})

	getPayloadList()
	getJenis()
	getPaket()
	getClient()
})
</script>