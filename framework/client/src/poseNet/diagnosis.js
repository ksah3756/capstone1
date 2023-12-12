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
// wrongPartIndex 0 = neck, 1 = back, 2 = knee
export function diagnosisResult(scores) {
    let [wrongPartIndex, max_ratio] = findMaxRatioPart(scores);
    let poseScore = evalPose(scores);
    let diagnosis = {}
    
    diagnosis['poseScore'] = poseScore;
    diagnosis['wrongPartIndex'] = wrongPartIndex;

    switch (wrongPartIndex){
        case 0:     // neck
            if (max_ratio < 30){
                diagnosis['content'] = "목과 어깨 통증 유발";
            }
            else if (max_ratio >= 30 && max_ratio < 50){
                diagnosis['content'] = "목과 어깨 통증 유발\n두통 및 눈의 피로 발생";
            }
            else{
                diagnosis['content'] = "목과 어깨 통증 유발\n두통 및 눈의 피로 발생\n경추 변형으로 인한 목 디스크 발생 가능";
            }
            break;
        case 1:     // back
            if (max_ratio < 30){
                diagnosis['content'] = "허리 통증 유발";
            }
            else if (max_ratio >= 30 && max_ratio < 50){
                diagnosis['content'] = "허리 통증 유발\n허리 근육의 약화로 인한 허리의 안정성 감소 및 다양한 통증 유발";
            }
            else{
                diagnosis['content'] = "허리 통증 유발\n허리 근육의 약화\n척추 불균형으로 인한 허리디스크 발생 가능";
            }
            break;
        case 2:     // knee
            if (max_ratio < 30){
                diagnosis['content'] = "무릎 통증 유발";
            }
            else if (max_ratio >= 30 && max_ratio < 50){
                diagnosis['content'] = "무릎 통증 유발\n다리 혈액 순환 방해로 인한 통증&부기 발생 가능";
            }
            else{
                diagnosis['content'] = "무릎 통증 유발\n다리 혈액 순환 방해로 인한 통증&부기 발생 가능\n무릎 관절에 장시간 가해지는 스트레스로 인한 연골 손상, 관절염과 같은 문제 발생 가능";
            }
            break;
    }

    return diagnosis;
}

// 현재 상태에 표시하기 위한 진단
// 진단 내용과 자세 점수를 각 부위에 dictionary 형태로 저장 (자세 점수: 1 = 위험, 2 = 주의 등등)
// ex) {poseScore: 3, neck: "목과 어깨 통증 및 두통 발생\n목 디스크 발생", back: "허리 통증 및 약화\n허리 디스크 발생"}
// 해당 dictionary에 key 값이 존재하면 잘못된 부분, key 값이 존재하지 않으면 올바른 부분
export function diagnosisCurrent(poseData){
    let diagnosis = {};
    let poseScore = 4;

    if (!poseData.neck){
        diagnosis['neck'] = (
            <p>
                <strong>목을 펴세요.</strong> <br />
                <div style={{color:"gray", opacity:0.5}}>목과 어깨 통증 및 두통 발생 가능, 목 디스크 발생 가능</div>
            </p>
        );
        poseScore -= 1;
    }

    if (!poseData.hip){
        diagnosis['back'] = (
            <p>
                <strong>허리를 펴세요.</strong> <br/>
                <div style={{color:"gray", opacity:0.5}}>허리 통증 및 약화 가능, 허리 디스크 발생 가능</div>
            </p>
        );
        poseScore -= 1;
    }

    if (!poseData.knee){
        diagnosis['knee'] = (
            <p>
                <strong>무릎을 올바르게 위치하세요.</strong> <br/>
                <div style={{color:"gray", opacity:0.5}}>무릎 통증 및 부기 발생, 연골 손상, 관절염 발생 가능</div>
            </p>
        );
        poseScore -= 1;
    }

    diagnosis['poseScore'] = poseScore;
    
    return diagnosis;
}