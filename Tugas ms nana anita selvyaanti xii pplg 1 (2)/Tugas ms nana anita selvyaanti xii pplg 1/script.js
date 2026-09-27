const formPendaftaran = document.querySelector('.formPendaftaran');
const inputNama = document.querySelector('.inputNama');
const inputJurusan = document.querySelector('.inputJurusan');
const inputEkskul = document.querySelector('.inputEkskul');
const tabelData = document.querySelector('.dataPendaftaran');

const daftarSiswa = [];

let indexEdit = null;

function tampilkanData() {
    tabelData.innerHTML = '';

    daftarSiswa.forEach((siswa, index) => {
        tabelData.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${siswa.nama}</td>
                <td>${siswa.kelas}</td>
                <td>${siswa.jurusan}</td>
                <td>${siswa.ekskul}</td>
                <td>
                    <button type="button" class="editButton" onclick="editData(${index})">Edit</button>
                    <button type="button" class="deleteButton" onclick="hapusData(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

formPendaftaran.addEventListener('submit', (event) => {
    event.preventDefault();

    const kelasDipilih = document.querySelector('input[name="kelas"]:checked');

    if (inputNama.value.trim() === '' || !kelasDipilih) {
        return;
    }

    const dataSiswa = {
        nama: inputNama.value.trim(),
        kelas: kelasDipilih.value,
        jurusan: inputJurusan.value,
        ekskul: inputEkskul.value
    };

    if (indexEdit !== null) {
        daftarSiswa[indexEdit] = dataSiswa;
        indexEdit = null;
    } else {
        daftarSiswa.push(dataSiswa);
    }

    tampilkanData();
    formPendaftaran.reset();
});

function editData(index) {
    const siswa = daftarSiswa[index];

    inputNama.value = siswa.nama;
    inputJurusan.value = siswa.jurusan;
    inputEkskul.value = siswa.ekskul;

    const kelasDipilih = document.querySelector(
        `input[name="kelas"][value="${siswa.kelas}"]`
    );

    if (kelasDipilih) {
        kelasDipilih.checked = true;
    }

    indexEdit = index;
}

function hapusData(index) {
    daftarSiswa.splice(index, 1);
    tampilkanData();
}

