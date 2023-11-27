// 과거 데이터에 표시하기 위한 진단. 가장 높은 비율을 가진 부위의 index와 ratio를 입력으로 받는다.
export function diagnosisResult(index, ratio, pastRatio) {
    var diagnosis = null;

    switch (index){
        case 0:     // neck
            if (ratio >= 15 && ratio < 30){
                diagnosis = "목과 어깨 통증 유발";
            }
            else if (ratio >= 30 && ratio < 50){
                diagnosis = "목과 어깨 통증 유발\n두통 및 눈의 피로 발생";
            }
            else if (ratio >= 50){
                diagnosis = "목과 어깨 통증 유발\n두통 및 눈의 피로 발생\n경추 변형으로 인한 목 디스크 발생 가능";
            }
            break;
        case 1:     // back
            if (ratio >= 15 && ratio < 30){
                diagnosis = "허리 통증 유발";
            }
            else if (ratio >= 30 && ratio < 50){
                diagnosis = "허리 통증 유발\n허리 근육의 약화로 인한 허리의 안정성 감소 및 다양한 통증 유발";
            }
            else if (ratio >= 50){
                diagnosis = "허리 통증 유발\n허리 근육의 약화\n척추 불균형으로 인한 허리디스크 발생 가능";
            }
            break;
        case 2:     // knee
            if (ratio >= 15 && ratio < 30){
                diagnosis = "무릎 통증 유발";
            }
            else if (ratio >= 30 && ratio < 50){
                diagnosis = "무릎 통증 유발\n다리 혈액 순환 방해로 인한 통증&부기 발생 가능";
            }
            else if (ratio >= 50){
                diagnosis = "무릎 통증 유발\n다리 혈액 순환 방해로 인한 통증&부기 발생 가능\n무릎 관절에 장시간 가해지는 스트레스로 인한 연골 손상, 관절염과 같은 문제 발생 가능";
            }
            break;
    }

    return diagnosis;
}

// 현재 상태에 표시하기 위한 진단
export function diagnosisCurrent(index){
    var diagnosis = null;

    switch (index){
        case 0:     // neck
            diagnosis = "목과 어깨 통증 및 두통 발생\n목 디스크 발생";
            break;
        case 1:     // back
            diagnosis = "허리 통증 및 약화\n허리 디스크 발생";
            break;
        case 2:     // knee
            diagnosis = "무릎 통증 및 부기 발생\n연골 손상, 관절염 발생";
            break;
    }
}