// 가장 비율이 높은 부위를 찾는 함수
function findMaxRatioPart(scores){
    if (scores.neck_score_ratio > scores.hip_score_ratio && scores.neck_score_ratio > scores.knee_score_ratio){
        return [0, scores.neck_score_ratio];
    }
    else if (scores.hip_score_ratio > scores.neck_score_ratio && scores.hip_score_ratio > scores.knee_score_ratio){
        return [1, scores.hip_score_ratio];
    }
    else{
        return [2, scores.knee_score_ratio];
    }
}

// 전체적인 자세 평가 함수. 3가지 비율을 평균을 내서 바름(0 ~ 25), 주의(25 ~ 50), 심각(50 ~ 75), 매우심각(75 ~ 100) 으로 나눈다.
function evalPose(scores){
    let avg_ratio = (scores.neck_score_ratio + scores.hip_score_ratio + scores.knee_score_ratio) / 3;

    if (avg_ratio < 25){
        return 0;
    }
    else if (avg_ratio < 50){
        return 1;
    }
    else if (avg_ratio < 75){
        return 2;
    }
    else{
        return 3;
    }
}

// 과거 데이터에 표시하기 위한 진단. 가장 높은 비율을 가진 부위의 index와 ratio를 입력으로 받는다.
// poseScore 0 = 바름, 1 = 주의, 2 = 심각, 3 = 매우심각
export function diagnosisResult(scores) {
    let [index, max_ratio] = findMaxRatioPart(scores);
    let poseScore = evalPose(scores);
    let diagnosis = null;

    switch (index){
        case 0:     // neck
            if (max_ratio >= 15 && max_ratio < 30){
                diagnosis = "목과 어깨 통증 유발";
            }
            else if (max_ratio >= 30 && max_ratio < 50){
                diagnosis = "목과 어깨 통증 유발\n두통 및 눈의 피로 발생";
            }
            else if (max_ratio >= 50){
                diagnosis = "목과 어깨 통증 유발\n두통 및 눈의 피로 발생\n경추 변형으로 인한 목 디스크 발생 가능";
            }
            break;
        case 1:     // back
            if (max_ratio >= 15 && max_ratio < 30){
                diagnosis = "허리 통증 유발";
            }
            else if (max_ratio >= 30 && max_ratio < 50){
                diagnosis = "허리 통증 유발\n허리 근육의 약화로 인한 허리의 안정성 감소 및 다양한 통증 유발";
            }
            else if (max_ratio >= 50){
                diagnosis = "허리 통증 유발\n허리 근육의 약화\n척추 불균형으로 인한 허리디스크 발생 가능";
            }
            break;
        case 2:     // knee
            if (max_ratio >= 15 && max_ratio < 30){
                diagnosis = "무릎 통증 유발";
            }
            else if (max_ratio >= 30 && max_ratio < 50){
                diagnosis = "무릎 통증 유발\n다리 혈액 순환 방해로 인한 통증&부기 발생 가능";
            }
            else if (max_ratio >= 50){
                diagnosis = "무릎 통증 유발\n다리 혈액 순환 방해로 인한 통증&부기 발생 가능\n무릎 관절에 장시간 가해지는 스트레스로 인한 연골 손상, 관절염과 같은 문제 발생 가능";
            }
            break;
    }

    return [poseScore, diagnosis];
}

// 현재 상태에 표시하기 위한 진단(피그마에 있는 현재 상태 디자인에 들어갈 내용)
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

    return diagnosis;
}