import { Injectable } from "@angular/core";
import { VOCABULARY } from "src/app/constants/translations/vocabulary";

@Injectable({
  providedIn: "root"
})
export class TranslateService {
  constructor() {}

  translate(label) {
    return VOCABULARY[label];
  }
}
