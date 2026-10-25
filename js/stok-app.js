var stokApp = new Vue({
    el: '#app',
    data: {
        // Mengambil data dari variabel global dbBahanAjar di dataBahanAjar.js
        upbjjList: dbBahanAjar.upbjjList,
        kategoriList: dbBahanAjar.kategoriList,
        stok: dbBahanAjar.stok,

        // State untuk Filter & Pencarian
        cariKeyword: '',
        filterUpbjj: '',
        filterKategori: '',
        filterStatus: '',

        // State untuk Modal Form (Default tertutup)
        tampilModal: false,
        modeEdit: false,
        form: {
            kode: '',
            judul: '',
            kategori: '',
            upbjj: '',
            lokasiRak: '',
            harga: 0,
            qty: 0,
            safety: 0,
            catatanHTML: ''
        }
    },
    computed: {
        hitungStokAman() {
            return this.stok.filter(item => item.qty >= item.safety && item.qty > 0).length;
        },
        hitungStokMenipis() {
            return this.stok.filter(item => item.qty < item.safety && item.qty > 0).length;
        },
        hitungStokHabis() {
            return this.stok.filter(item => item.qty === 0).length;
        },
        filteredStok() {
            return this.stok.filter(item => {
                let matchKeyword = item.kode.toLowerCase().includes(this.cariKeyword.toLowerCase()) ||
                                   item.judul.toLowerCase().includes(this.cariKeyword.toLowerCase());
                let matchUpbjj = this.filterUpbjj === '' || item.upbjj === this.filterUpbjj;
                let matchKategori = this.filterKategori === '' || item.kategori === this.filterKategori;
                
                let status = 'Aman';
                if (item.qty === 0) status = 'Habis';
                else if (item.qty < item.safety) status = 'Menipis';

                let matchStatus = this.filterStatus === '' || status === this.filterStatus;

                return matchKeyword && matchUpbjj && matchKategori && matchStatus;
            });
        }
    },
    methods: {
        resetFilter() {
            this.cariKeyword = '';
            this.filterUpbjj = '';
            this.filterKategori = '';
            this.filterStatus = '';
        },
        bukaFormTambah() {
            this.modeEdit = false;
            this.form = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 0, catatanHTML: '' };
            this.tampilModal = true;
        },
        bukaFormEdit(item) {
            this.modeEdit = true;
            this.form = Object.assign({}, item);
            this.tampilModal = true;
        },
        simpanData() {
            if (this.modeEdit) {
                let index = this.stok.findIndex(s => s.kode === this.form.kode);
                if (index !== -1) {
                    this.stok.splice(index, 1, Object.assign({}, this.form));
                }
            } else {
                let exist = this.stok.find(s => s.kode === this.form.kode);
                if (exist) {
                    alert('Kode Mata Kuliah sudah terdaftar!');
                    return;
                }
                this.stok.push(Object.assign({}, this.form));
            }
            this.tampilModal = false;
        },
        sortData(field) {
            this.stok.sort((a, b) => {
                if (a[field] < b[field]) return -1;
                if (a[field] > b[field]) return 1;
                return 0;
            });
        }
    }
});