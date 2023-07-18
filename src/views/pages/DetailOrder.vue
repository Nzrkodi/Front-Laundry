<template>
    <SideBar />
    <div id="main">
        <NavBar />

        <div class="main-content container-fluid">
            <div class="page-title">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h4>Tabel Detail Order</h4>
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
                            <h4 class="card-title float-start">Data Detail Order</h4>
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
                                        <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
                                        <input class="dataTable-input" placeholder="Search..." type="text"
                                            v-model="meta.search" @keyup="() => { meta.page = 1; getPayloadList() }">
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-light mb-0">
                                    <thead>
                                        <tr>
                                            <th style="width: 4%;">No</th>
                                            <th style="width: 10%;"><a role="button"
                                                    @click="sortingData(meta.sort, 'nama')"><font-awesome-icon
                                                        :icon="meta.sortIcon.nama" /> Order</a></th>
                                            <th><a role="button" @click="sortingData(meta.sort, 'harga')"><font-awesome-icon
                                                        :icon="meta.sortIcon.alamat" /> Jenis</a></th>
                                            <th><a role="button"
                                                    @click="sortingData(meta.sort, 'alamat')"><font-awesome-icon
                                                        :icon="meta.sortIcon.no_hp" /> Paket</a></th>
                                            <th><a role="button"
                                                    @click="sortingData(meta.sort, 'created_at')"><font-awesome-icon
                                                        :icon="meta.sortIcon.created_at" /> Berat</a></th>
                                            <th><a role="button"
                                                    @click="sortingData(meta.sort, 'created_at')"><font-awesome-icon
                                                        :icon="meta.sortIcon.created_at" /> Harga</a></th>
                                            <th><a role="button"
                                                    @click="sortingData(meta.sort, 'created_at')"><font-awesome-icon
                                                        :icon="meta.sortIcon.created_at" /> Status</a></th>
                                            <th><a role="button"
                                                    @click="sortingData(meta.sort, 'created_at')"><font-awesome-icon
                                                        :icon="meta.sortIcon.created_at" /> Keterangan</a></th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <TransitionGroup name="table" tag="tbody">
                                        <tr v-for="(item, index) in payloadList" :key="index">
                                            <td class="text-bold-500">{{ Other.getNumber(index, meta) }}</td>
                                            <td>{{ item.code_resi }}</td>
                                            <td class="text-bold-500">{{ item.nama_cucian }}</td>
                                            <td class="text-bold-500">{{ item.nama_paket }}</td>
                                            <td class="text-bold-500">{{ item.berat == null ? item.berat : 'Tidak ada berat'
                                            }}</td>
                                            <td class="text-bold-500">{{ item.harga }}</td>
                                            <td class="text-bold-500">{{ item.status == null ? item.status : 'Belum diambil'
                                            }}</td>
                                            <td class="text-bold-500">{{ item.keterangan }}</td>
                                            <td>
                                                <BaseButton :row-data="item" @event-click="setDataToForm"
                                                    class="btn btn-outline-primary me-3">Edit</BaseButton>
                                                <BaseButton :data-id="item.id" @event-click="deleteConfirm"
                                                    class="btn btn-outline-danger">Hapus</BaseButton>
                                            </td>
                                        </tr>
                                    </TransitionGroup>
                                </table>
                                <TransitionGroup name="defend" tag="div" class="d-flex justify-content-center">
                                    <h5 class="text-muted py-3" v-if="meta.total === 0 && meta.search.length === 0">Belum
                                        ada data dalam tabel ini!</h5>
                                    <h5 class="text-muted py-3" v-if="meta.total_in_page === 0 && meta.search.length >= 1">
                                        Data tidak ditemukan!</h5>
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

        <BaseModal md-size="modal-lg">
            <template v-slot:header>
                <h5 class="modal-title" id="exampleModalLabel">Formulir Data</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </template>
            <template v-slot:body>
                <div class="mx-2 my-4">
                    <div class="form-group">
                        <BaseInput v-model="payload.order_id" label="Code Resi" type="text" :required="true"
                            placeholder="input disini..." />
                    </div>

                    <div class="form-group mt-3">
                        <BaseInput v-model.number="payload.jenis_id" label="Paket" type="string" :required="true"
                            placeholder="input disini..." />
                    </div>

                    <div class="form-group mt-3">
                        <BaseInput v-model.number="payload.paket_id" label="Paket" type="string" :required="true"
                            placeholder="input disini..." />
                    </div>
                    <div class="form-group mt-3">
                        <BaseInput v-model.number="payload.berat" label="Handpone" type="string" :required="true"
                            placeholder="input disini..." />
                    </div>
                    <div class="form-group mt-3">
                        <BaseInput v-model.number="payload.harga" label="Handpone" type="string" :required="true"
                            placeholder="input disini..." />
                    </div>
                    <div class="form-group mt-3">
                        <BaseInput v-model.number="payload.status" label="Handpone" type="string" :required="true"
                            placeholder="input disini..." />
                    </div>
                    <div class="form-group mt-3">
                        <BaseInput v-model.number="payload.keterangan" label="Handpone" type="string" :required="true"
                            placeholder="input disini..." />
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
import Detail from '../../utils/Detail'
import Other from '../../utils/Other'
import moment from 'moment';
import * as Yup from 'yup'
import { useRoute } from 'vue-router'

const router = useRoute()
/* GET DATA FUNCTION */
const payloadList = ref([])
const meta = reactive({
    sortIcon: {
        order_id: 'fa-sort',
        jenis_id: 'fa-sort',
        paket_id: 'fa-sort',
        berat: 'fa-sort-up',
        harga: 'fa-sort-up',
        status: 'fa-sort-up',
        keterangan: 'fa-sort-up',
    },
    search: "",
    limit: 10,
    page: 1,
    total: 1,
    total_in_page: 0,
    sort: "desc",
    orderBy: "created_at",
    order_id: parseInt(router.params.order_id)
})

const getPayloadList = () => {
    Detail.getAllList(meta)
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

/* UPSERT DATA FUNCTION */
const payload = reactive({
    order_id: 0,
    jenis_id: 0,
    paket_id: 0,
    berat: 0,
    harga: 0,
    status: 0,
    keterangan: '',
})


const errorPayload = ref('');

const upsertPayload = async () => {
    try {
        const payloadSchema = Yup.object().shape({
            nama: Yup.string()
                .required('Field harus diisi')
                .min(2, 'Field minimal terdiri dari 2 karakter')
                .max(150, 'Field maksimal terdiri dari 150 karakter'),
            alamat: Yup.string()
                .typeError('Field harus bertipe nomor')
                .required('Field harus diisi'),
            no_hp: Yup.number()
                .typeError('Field harus bertipe nomor')
                .required('Field harus diisi'),
        });

        await payloadSchema.validate(payload, { abortEarly: false });
        Detail.upsert(payload)
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
    Detail.delete(dataId)
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