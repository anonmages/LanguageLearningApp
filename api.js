import fetch from 'node-fetch';
const BASE_URL = process.env.BASE_URL;
async function fetchLessons() {
    try {
        const response = await fetch(`${BASE_URL}/lessons`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching lessons:', error);
    }
}
async function fetchLessonDetails(lessonId) {
    try {
        const response = await fetch(`${BASE_URL}/lessons/${lessonId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching details for lesson ${lessonId}:`, error);
    }
}
async function fetchQuizzes(lessonId) {
    try {
        const response = await fetch(`${BASE_URL}/lessons/${lessonId}/quizzes`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching quizzes for lesson ${lessonId}:`, error);
    }
}
async function submitQuizAnswers(quizId, answers) {
    try {
        const response = await fetch(`${BASE_URL}/quizzes/${quizId}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error submitting answers for quiz ${quizId}:`, error);
    }
}
async function fetchProgress(userId) {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/progress`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching progress for user ${userId}:`, error);
    }
}
export {
    fetchLessons,
    fetchLessonDetails,
    fetchQuizzes,
    submitQuizAnswers,
    fetchProgress,
};