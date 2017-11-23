import { stat } from "fs";
import { TabClassKey } from "material-ui/Tabs";
import * as React from "react";

export default class LecturersPages {
    public static GetLecturerPage(lecturer: string): string {
        if (!LecturersPages.initialized) {
            LecturersPages.Initialize();
            LecturersPages.initialized = true;
        }
        if (LecturersPages[lecturer] !== undefined) {
            return LecturersPages[lecturer];
        }
        return "http://www.wzim.sggw.pl/" + lecturer + "/";
    }

    private static initialized: boolean = false;

    private static Initialize(): void {
        LecturersPages["krzysztof_gajowniczek"] = "http://krzysztof_gajowniczek.users.sggw.pl/";
        LecturersPages["ewa_jalowiecka"] = "http://www.sggw.pl/o_pracowniku&employee_id=1175692";
        LecturersPages["piotr_jalowiecki"] = "http://www.sggw.pl/o_pracowniku&employee_id=1175694";
        LecturersPages["maciej_janowicz"] = "http://www.sggw.pl/o_pracowniku&employee_id=1180300";
        LecturersPages["arkadiusz_orlowski"] = "http://ao.cem.sggw.pl/";
        LecturersPages["marek_karwanski"] = "http://www.sggw.pl/o_pracowniku&employee_id=1207500";
        LecturersPages["michal_kruk"] = "http://michal_kruk.users.sggw.pl/";
        LecturersPages["piotr_lukasiewicz"] = "http://www.sggw.pl/o_pracowniku&employee_id=1310301";
        LecturersPages["rafik_nafkha"] = "http://www.wzim.pl/";
        LecturersPages["luiza_ochnio"] = "http://www.sggw.pl/o_pracowniku&employee_id=1070900";
        LecturersPages["adam_przezdziecki"] = "http://adam_przezdziecki.users.sggw.pl";
        LecturersPages["marian_rusek"] = "http://e.sggw.pl/rusek/";
        LecturersPages["piotr_stachura"] = "http://www.wzim.sggw.pl/piotr_stachura1/";
        LecturersPages["aleksander_strasburger"] = "http://aleksander_strasburger.users.sggw.pl";
        LecturersPages["monika_zielinska-sitkiewicz"] = "http://www.sggw.pl/o_pracowniku&employee_id=1621855";
        LecturersPages["wojciech_zielisnki"] = "http://wojtek.zielinski.statystyka.info";
    }
}
