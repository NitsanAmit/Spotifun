export class LocaleService {

    public strings: DeclaredStrings;

    constructor(private readonly locale: string) {
        this.strings = require(`./strings.${this.locale}.json`);
    }

}

export interface DeclaredStrings {
    genre_picker_title: string;
    genre_picker_proceed_button: string;
    artists_picker_title: string;
    artists_picker_info_box_title: string;
    artists_picker_info_box_content: string;
    artists_picker_proceed_button_enabled: string;
    artists_picker_proceed_button_disabled: string;
    login_form_info_box_title: string;
    login_form_info_box_content: string;
}