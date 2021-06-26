const d = document,
  $main = d.querySelector("main"),
  $files = d.getElementById("files");

//* Funcion para la carga de los archivos.
const uploader = (file) => {
  const xhr = new XMLHttpRequest(),
    formData = new FormData();

  formData.append("file", file);

  //* Creando la petición
  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      console.log(json);
    } else {
      let message = xhr.statusText || "Ocurrió un Error";
      console.error(`${xhr.status}: ${message}`);
    }
  });
  xhr.open("POST", "assets/uploader.php");
  xhr.setRequestHeader("enc-type", "multipart/form-data");
  xhr.send(formData);
};

/* Barra de progreso a la carga de los archivos. */
const progressUpload = (file) => {
  const $progress = d.createElement("progress"),
    $span = d.createElement("span");

  $progress.value = 0;
  $progress.max = 100;
  $main.insertAdjacentElement("beforeend", $progress);
  $main.insertAdjacentElement("beforeend", $span);

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.addEventListener("progress", (e) => {
    console.log(e);
  });
  fileReader.addEventListener("loadend", (e) => {});
};

d.addEventListener("change", (e) => {
  if (e.target === $files) {
    console.log(e.target.files);

    const files = Array.from(e.target.files);
    files.forEach((el) => progressUpload(el));
  }
});
