import * as React from "react";
import ITimetableEvent from "../models/ITimetableEvent";

declare let device: any;
declare let cordova: any;

export default class LecturersPages {

    public static openLecturersPage(event: ITimetableEvent) {
        const name: string = event.lecturers[0].toLowerCase()
            .replace(" ", "_")
            .replace("ą", "a")
            .replace("ć", "c")
            .replace("ę", "e")
            .replace("ł", "l")
            .replace("ó", "o")
            .replace("ż", "z")
            .replace("ź", "z")
            .replace("ś", "s")
            .replace("ń", "n");
        const linkURL: string = this.getLecturerPage(name);
        cordova.InAppBrowser.open(linkURL, "_system", "location=yes");
    }

    private static lecturersPages: any = {
        "krzysztof_gajowniczek": "http://krzysztof_gajowniczek.users.sggw.pl/",
        "ewa_jalowiecka": "http://www.sggw.pl/o_pracowniku&employee_id=1175692",
        "piotr_jalowiecki": "http://www.sggw.pl/o_pracowniku&employee_id=1175694",
        "maciej_janowicz": "http://www.sggw.pl/o_pracowniku&employee_id=1180300",
        "arkadiusz_orlowski": "http://ao.cem.sggw.pl/",
        "marek_karwanski": "http://www.sggw.pl/o_pracowniku&employee_id=1207500",
        "michal_kruk": "http://michal_kruk.users.sggw.pl/",
        "piotr_lukasiewicz": "http://www.sggw.pl/o_pracowniku&employee_id=1310301",
        "rafik_nafkha": "http://www.wzim.pl/",
        "luiza_ochnio": "http://www.sggw.pl/o_pracowniku&employee_id=1070900",
        "adam_przezdziecki": "http://adam_przezdziecki.users.sggw.pl",
        "marian_rusek": "http://e.sggw.pl/rusek/",
        "piotr_stachura": "http://www.wzim.sggw.pl/piotr_stachura1/",
        "aleksander_strasburger": "http://aleksander_strasburger.users.sggw.pl",
        "monika_zielinska-sitkiewicz": "http://www.sggw.pl/o_pracowniku&employee_id=1621855",
        "wojciech_zielinski": "http://wojtek.zielinski.statystyka.info",
    };

    private static getLecturerPage(lecturer: string): string {
        if (this.lecturersPages[lecturer] !== undefined) {
            return this.lecturersPages[lecturer];
        }
        return "http://www.wzim.sggw.pl/" + lecturer + "/";
    }
}
