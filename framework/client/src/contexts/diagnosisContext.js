import React, { createContext, useContext, useState } from 'react';

// diagnosis_cur(현재 상태 진단 결과, diagnosis.js의 diagnosisCurrent 함수 참고) 사용법
// 1) import { useDiagnosis } from 'pose.js의 path';
// 2) const { diagnosis_cur } = useDiagnosis();
// 3) 이후 diagnosis_cur 사용 ( 해당 변수의 형태는 diagnosis.js의 diagnosisCurrent() 함수 참고 )
export const DiagnosisContext = createContext(null);

export const DiagnosisProvider = ({ children }) => {
  const [diagnosis_cur, setDiagnosis] = useState(null);

  return (
    <DiagnosisContext.Provider value={{ diagnosis_cur, setDiagnosis }}>
      {children}
    </DiagnosisContext.Provider>
  );
};

export const useDiagnosis = () => {
  return useContext(DiagnosisContext);
};