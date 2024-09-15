import fetch from 'node-fetch';
const BASE_URL = process.env.BASE_URL;

async function fetchAPI(endpoint, options = {}) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error; 
    }
}

async function fetchLessons() {
    return await fetchAPI(`/lessons`);
}

async function fetchLessonDetails(lessonId) {
    return await fetchAPI(`/lessons/${lessonId}`);
}

async function fetchQuizzes(lessonId) {
    return await fetchAPI(`/lessons/${lessonId}/quizzes`);
}

async function submitQuizAnswers(quizId, answers) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
    };
    return await fetchAPI(`/quizzes/${quizId}/submit`, options);
}

async function fetchProgress(userId) {
    return await fetchAPI(`/users/${userId}/progress`);
}

export {
    fetchLessons,
    fetchLessonDetails,
    fetchQuizzes,
    submitQuizAnswers,
    fetchProgress,
};