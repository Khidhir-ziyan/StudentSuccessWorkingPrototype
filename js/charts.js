window.initDashboardCharts = function() {
    // Daily Chat Volume Chart
    const ctxDaily = document.getElementById('dailyChatChart');
    if (ctxDaily) {
        new Chart(ctxDaily, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Volume Chat',
                    data: [65, 59, 80, 81, 56, 45, 30],
                    fill: true,
                    borderColor: '#4f46e5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Sentiment Distribution Chart
    const ctxSentiment = document.getElementById('sentimentChart');
    if (ctxSentiment) {
        new Chart(ctxSentiment, {
            type: 'doughnut',
            data: {
                labels: ['Positive', 'Neutral', 'Negative', 'Critical'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#10b981', // success
                        '#3b82f6', // info
                        '#f59e0b', // warning
                        '#ef4444'  // danger
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
};
