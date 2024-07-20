import { EducationalUnitEnum } from "@config/enums/educationalUnit.enum";
import { Lo } from "./Lo";

export interface Eu {
    id?: number;
    title: string;
    type: EducationalUnitEnum;
    duration: string;
    LO : Lo[];
    }