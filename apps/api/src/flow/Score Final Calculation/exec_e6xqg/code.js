module.exports = async function() {
    const employeeCourses = {{ $last }}

    const newData = employeeCourses.map((ec) => {
        const examScore = ec.exam_score || 0;
        const tasksScore = ec.tasks_score || 0;
        const isOpenExam = ec.course.is_open_exam;
        const isOpenTask = ec.course.is_open_task;
        const minScore = ec.course.min_score;

        const examEvaluation = isOpenExam ? ((examScore / 100) * (isOpenTask ? 70 : 100)) : 0;
        const taskEvaluation = isOpenTask ? (tasksScore / 100) * 30 : tasksScore;
        const totalEvaluation = examEvaluation + taskEvaluation;

    	return {
        	id: ec.id,
            exam_score_final: examEvaluation,
            tasks_score_final: taskEvaluation,
			score_final: totalEvaluation,
            is_passed: totalEvaluation >= minScore
        };
    })
	return newData;
}