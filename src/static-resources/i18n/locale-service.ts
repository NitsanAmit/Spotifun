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
    playlist_item_heart_button_alt: string;
    playlist_item_album_image_alt: string;
    playlist_item_album_image_play_button_alt: string;
    playlist_controls_save_button_playlist_saved: string;
    playlist_controls_save_button_save_playlist: string;
    playlist_controls_start_over_button: string;
    playlist_review_title: string;
    playlist_review_description: string;
    user_card_profile_alt: string;
}