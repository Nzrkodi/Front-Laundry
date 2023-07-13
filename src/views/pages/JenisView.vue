<template>
	<SideBar />
	<div id="main">
		<NavBar />

		<div class="main-content container-fluid">
			<div class="page-title">
				<div class="row">
					<div class="col-12 col-md-6 order-md-1 order-last">
						<h4>Tabel Cuci Satuan</h4>
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
							<h4 class="card-title float-start">Data Cuci Satuan</h4>
							<BaseButton @event-click="showHideModal" class="float-end btn btn-primary btn-sm">Tambah Data</BaseButton>
						</div>
						<div class="card-body">
							<div class="table-responsive">
								<table class="table table-light mb-0">
									<thead>
										<tr>
											<th>No</th>
											<th>Nama</th>
											<th>Harga</th>
											<th style="width: 20%;">ACTION</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in payloadList" :key="index">
											<td class="text-bold-500">{{ Other.getNumber(index, meta) }}</td>
											<td>{{ item.nama }}</td>
											<td class="text-bold-500">{{ item.harga }}</td>
											<td>
												<a href="" class="btn btn-outline-primary" style="margin-right: 0.5rem;">Edit</a>
												<a href="" class="btn btn-outline-danger">Delete</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BaseModal md-size="modal-lg" >
			<template v-slot:header>
				<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</template>
			<template v-slot:body>

			</template>
			<template v-slot:footer>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
			</template>
		</BaseModal>

		<Footer />
	</div>
</template>
  
<script setup>
import BaseButton from '../component/BaseButton.vue';
import BaseModal from '../component/BaseModal.vue';
import { onMounted, reactive, ref } from 'vue';
import myModal from 'bootstrap/js/dist/modal'
import SideBar from '../skelton/SideBar.vue'
import NavBar from '../skelton/NavBar.vue'
import Footer from '../skelton/Footer.vue'
import Jenis from '../../utils/Jenis'
import Other from '../../utils/Other'

/* GET DATA FUNCTION */
const payloadList = ref([])
const meta = reactive({
	search  : "",
	limit   : 10,
	page    : 1,
	total   : 0,
	sort    : "DESC",
	orderBy : "created_at"
})

const getPayloadList = () => {
	Jenis.getAllList(meta)
	.then((res) => {
		let item = res.data
		meta.total = item.meta.total

		payloadList.value = item.data
	})
	.catch((err) => {
		console.log(err);
	})
}

/* ANOTHER FUNCTION */
const modal = ref(null)

const showHideModal = (params) => {
	console.log(params);
	if (params && params.typeButton == 'new-data') {
		clearInput()
	}
	modal.value.show() ? modal.value.show() : modal.value.hide()
}

onMounted(() => {
	modal.value = new myModal('#myModal', {
		keyboard:false
	})

	getPayloadList()
})
</script>