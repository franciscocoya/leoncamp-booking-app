<script setup>
import { ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";

// Iconos
import InfoIcon from "@/components/icons/InfoIcon.vue";

// Componentes
import BaseButton from "@/components/Buttons/BaseButton.vue";
import AccomodationImagePreviewItem from "@/components/Accomodation/AccomodationImagePreviewItem.vue";

// Store
import { useAccomodationStore } from "@/store/accomodation";
import { useFormErrorsStore } from "@/store/formErrors";

// Conversor imagen a base64
import { convertImageToBase64, MAX_IMAGES_UPLOAD } from "@/helpers/utils";

// Validadores para la subida de imágenes
import { checkFileSize, checkImageMimeType } from "@/helpers/formValidator";

const accomodationStore = useAccomodationStore();
const formErrorsStore = useFormErrorsStore();

const dragText = ref("upload_accomodation_view.step5.dragArea.title");

/**
 * Manejador del evento de subida de imágenes mediante drag & drop.
 *
 * @see https://developer.mozilla.org/es/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
 */
const handleDragImages = async (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (e.dataTransfer.items) {
    if (e.dataTransfer.items.length > MAX_IMAGES_UPLOAD) {
      showImageMessage("components.forms.messages.images.maxImages");
      return;
    } else {
      // Usar la interfaz DataTransferItemList para acceder a el/los archivos)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // Si los elementos arrastrados no son ficheros, rechazarlos
        if (e.dataTransfer.items[i].kind === "file") {
          dragText.value = "components.forms.messages.images.loading";
          let file = await e.dataTransfer.items[i].getAsFile();

          // Comprobar que la imagen no supera el tamaño máximo
          // y que su MIME type es válido.
          if (checkFileSize(file)) {
            if (checkImageMimeType(file)) {
              let imageBase64 = await convertImageToBase64(file);

              let accomodationImageToAdd = {
                idAccomodation: accomodationStore.registerNumber,
                idAccomodationImage: {
                  id: i,
                  imageUrl: imageBase64,
                },
              };

              await accomodationStore.accomodationImages.push(
                accomodationImageToAdd
              );

              dragText.value = "components.forms.messages.images.success";
              document
                .getElementById("drag_and_drop_area_container")
                .classList.add("--drag-area-success");

              setTimeout(() => {
                document
                  .getElementById("drag_and_drop_area_container")
                  .classList.remove("--drag-area-success");
              }, 4000);
            } else {
              showImageMessage("components.forms.messages.images.mime");
            }
          } else {
            showImageMessage("components.forms.messages.images.size");
          }
        }
      }
    }
  } else {
    // Usar la interfaz DataTransfer para acceder a el/los archivos
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
      let file = await e.dataTransfer.files[i].getAsFile();
      if (
        e.dataTransfer.files[i].kind === "file" &&
        e.dataTransfer.files[i].type.match(/image.*/) &&
        checkFileSize(file)
      ) {
        if (checkImageMimeType(file)) {
          let imageBase64 = await convertImageToBase64(e.dataTransfer.files[i]);

          let accomodationImageToAdd = {
            idAccomodation: accomodationStore.registerNumber,
            idAccomodationImage: {
              id: i,
              imageUrl: imageBase64,
            },
          };

          accomodationStore.accomodationImages.push(accomodationImageToAdd);
          showImageMessage(
            "components.forms.messages.images.success",
            "success"
          );
        } else {
          showImageMessage("components.forms.messages.images.mime", "error");
        }
      } else {
        showImageMessage("components.forms.messages.images.size", "error");
      }
    }
  }

  removeDragImages(e);
};

/**
 * Elimina las imágenes de la zona de subida de imágenes.
 *
 * @see https://developer.mozilla.org/es/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
 */
const removeDragImages = (e) => {
  if (e.dataTransfer.items) {
    // Use DataTransferItemList interface to remove the drag data
    e.dataTransfer.items.clear();
  } else {
    // Use DataTransfer interface to remove the drag data
    e.dataTransfer.clearData();
  }
};

/**
 * Manejador del evento click para la subida de imágenes mediante formulario.
 */
const handleClickUploadImage = async (e) => {
  let uploadedFiles = e.target.files;

  if (uploadedFiles.length > MAX_IMAGES_UPLOAD) {
    showImageMessage("components.forms.messages.images.maxImages", "error");
  } else {
    for (let i = 0; i < uploadedFiles.length; i++) {
      if (checkFileSize(uploadedFiles[i])) {
        if (checkImageMimeType(uploadedFiles[i])) {
          let imageBase64 = await convertImageToBase64(uploadedFiles[i]);

          let accomodationImageToAdd = {
            idAccomodation: accomodationStore.registerNumber,
            idAccomodationImage: {
              id: i,
              imageUrl: imageBase64,
            },
          };

          await accomodationStore.accomodationImages.push(
            accomodationImageToAdd
          );
        } else {
          showImageMessage("components.forms.messages.images.mime", "error");
        }
      } else {
        showImageMessage("components.forms.messages.images.size", "error");
      }
    }
  }
};

/**
 * Método auxiliar para mostrar un error al subir una imagen en el área de subida (click o drag)
 */
const showImageMessage = (msg, type = "error") => {
  dragText.value = msg;

  document
    .getElementById("drag_and_drop_area_container")
    .classList.add(`--drag-area-${type}`);

  setTimeout(() => {
    document
      .getElementById("drag_and_drop_area_container")
      .classList.remove(`--drag-area-${type}`);

    dragText.value = "upload_accomodation_view.step5.dragArea.title";
  }, 4000);
};
</script>

<template>
  <div class="accomodation-ad-upload-images-view">
    <h2>{{$t('upload_accomodation_view.step5.title')}}</h2>
    <p>
      {{
        $tc("upload_accomodation_view.step5.subtitle", {
          n: MAX_IMAGES_UPLOAD,
        })
      }}
    </p>

    <div class="accomodation-ad-upload-images__wrapper">
      <!-- Área de selección y subida de archivos -->
      <div
        class="accomodation-ad-upload__drag-area"
        id="drag_and_drop_area_container"
        @drop="(e) => handleDragImages(e)"
        @dragover.stop
        @dragend="
          dragText = 'components.forms.messages.images.multiple_success'
        "
      >
        <form>
          <!-- Icono subida archivos -->
          <svg
            fill="gray"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="100px"
            height="100px"
          >
            <path
              d="M 43.988281 23.542969 C 43.75 17.6875 38.910156 13 33 13 C 31.980469 13 31.003906 13.132813 30.035156 13.40625 C 27.796875 10.054688 24.019531 8 20 8 C 13.582031 8 8.324219 13.0625 8.015625 19.40625 C 3.324219 20.695313 0 25.027344 0 30 C 0 36.066406 4.933594 41 11 41 L 41 41 C 45.964844 41 50 36.964844 50 32 C 50 28.167969 47.515625 24.734375 43.988281 23.542969 Z M 30.292969 26.707031 L 26 22.414063 L 26 34 L 24 34 L 24 22.414063 L 19.707031 26.707031 L 18.292969 25.292969 L 25 18.585938 L 31.707031 25.292969 Z"
            />
          </svg>
          <label for="">
            {{
              $tc(dragText, {
                size: 100,
                unit: "Kb",
              })
            }}

            <br />
            <span>{{$t('upload_accomodation_view.step5.dragArea.image_format')}}</span>
            <br />
            <span>{{$t('upload_accomodation_view.step5.dragArea.image_max_size')}}</span>
          </label>
          <input
            type="file"
            id="drag-input-upload-image"
            @input.stop="handleClickUploadImage"
            multiple
            accept="image/jpeg, image/png, image/gif, image/webp"
          />
        </form>
        <!-- Icono informatico del área -->
        <InfoIcon
          :text="$t('upload_accomodation_view.step5.dragArea.infoIcon')"
          id="info-icon-drag-area"
        />
      </div>

      <!-- Columna previsualización de las imágenes subidas -->
      <Transition name="fade">
        <div
          v-if="accomodationStore.accomodationImages.length > 0"
          class="accomodation-ad-upload__images-preview-container"
        >
          <AccomodationImagePreviewItem
            v-for="(image, index) in accomodationStore.accomodationImages"
            :key="image.idAccomodationImage.id"
            :imageUrl="image.idAccomodationImage.imageUrl"
            @removeImage="accomodationStore.accomodationImages.splice(index, 1)"
          />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/_mixins.scss";
@import "@/assets/scss/_variables.scss";

.accomodation-ad-upload-images-view {
  & > .accomodation-ad-upload-images__wrapper {
    @include flex-row-center;
    align-items: flex-start;
    gap: 30px;

    // Estilos área de selección y subida de archivos
    & > .accomodation-ad-upload__drag-area {
      @include flex-column-center;
      width: 33%;
      aspect-ratio: 1 / 1;
      background-color: $color-tertiary-light;
      border: 5px dashed $color-tertiary-dark;
      border-radius: $global-border-radius;
      padding: 0 30px;
      position: relative;

      &:hover > #info-icon-drag-area {
        display: block;
      }

      &:hover > form > svg {
        fill: $color-dark;
      }

      position: relative;
      & > form {
        @include flex-column-center;
        height: 100%;
        color: gray;

        & > svg {
          align-self: center;
          transition: fill 0.3s ease;
        }

        & > label {
          font-size: 1rem;
          text-align: center;
          & > span {
            font-size: 0.8rem;
          }
        }

        & > input {
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
          opacity: 0;
        }
      } // Fin form

      & > #info-icon-drag-area {
        display: none;
        position: absolute;
        bottom: 10px;
        left: 10px;
      }
    } // Fin accomodation-ad-upload__drag-area

    & > .accomodation-ad-upload__images-preview-container {
      @include flex-row;
      gap: 10px;
      flex-wrap: wrap;
      flex: 2;
    }
  } // Fin accomodation-ad-upload-images__wrapper
} // Fin accomodation-ad-upload-images-view

// Estilo área drag si se produce un error
.--drag-area-error {
  border-color: $color-danger !important;
  background-color: $color-danger-light !important;
}

// Estilo área drag si se produce un error
.--drag-area-success {
  border-color: $color-success !important;
  background-color: $color-success-light !important;
}

// ---------------------------------------------------------------
// -- Responsive design
// ---------------------------------------------------------------
@media (max-width: $breakpoint-sm) {
  .accomodation-ad-upload-images-view {
    & > .accomodation-ad-upload-images__wrapper {
      @include flex-column;
      gap: 20px;

      & > .accomodation-ad-upload__drag-area {
        width: 100%;
      }

      & > .accomodation-ad-upload__images-preview-container {
        @include flex-column;
      }
    }
  }
}
</style>