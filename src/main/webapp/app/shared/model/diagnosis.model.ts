import { IClaim } from 'app/shared/model/claim.model';
import { DiagnosisTypeEnum } from 'app/shared/model/enumerations/diagnosis-type-enum.model';
import { DiagnosisOnAdmissionEnum } from 'app/shared/model/enumerations/diagnosis-on-admission-enum.model';

export interface IDiagnosis {
  id?: number;
  sequence?: number | null;
  diagnosis?: string | null;
  type?: DiagnosisTypeEnum | null;
  onAdmission?: DiagnosisOnAdmissionEnum | null;
  claim?: IClaim | null;
}

export const defaultValue: Readonly<IDiagnosis> = {};
