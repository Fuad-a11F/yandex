import Block from "../../../core/block.ts";

class DropdownActions extends Block {
  render() {
    return `<div class="messageForm__actions">
                <div>
                    <img src="./icons/photo.svg" alt="photo and video"><p>Фото или Видео</p>
                </div>

                <div>
                    <img src="./icons/file.svg" alt="file"><p>Файл</p>
                </div>

                <div>
                    <img src="./icons/location.svg" alt="location"><p>Локация</p>
                </div>
            </div>`;
  }
}

export default DropdownActions;
