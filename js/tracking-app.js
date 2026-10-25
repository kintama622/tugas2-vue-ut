new Vue({
    el: '#app',
    data: {
        trackingData: dbBahanAjar.tracking,
        keyword: '',
        currentNoDO: '',
        selectedDO: null
    },
    computed: {
        daftarHasil() {
            let hasil = {};
            let q = this.keyword.toLowerCase();
            for (let noDO in this.trackingData) {
                let item = this.trackingData[noDO];
                if (noDO.toLowerCase().includes(q) || item.nama.toLowerCase().includes(q) || item.nim.includes(q)) {
                    hasil[noDO] = item;
                }
            }
            return hasil;
        }
    },
    methods: {
        pilihDO(noDO, item) {
            this.currentNoDO = noDO;
            this.selectedDO = item;
            this.keyword = noDO;
        },
        cariDO() {
            let keys = Object.keys(this.daftarHasil);
            if (keys.length > 0) {
                this.pilihDO(keys[0], this.daftarHasil[keys[0]]);
            } else {
                alert('Nomor Delivery Order tidak ditemukan!');
                this.selectedDO = null;
            }
        }
    }
});