const conferences = [
    {
        id: 1,
        name: "TotalMed",
        startDate: "12 / 10 / 2020",
        endDate: "14 / 10 / 2020",
        type: 'Remote',
        category: 'Medical',
        location: {
            id: 1,
            county: {
                id: 1,
                name: 'Bucharest'
            },
            country: {
                id: 2,
                name: 'Romania'
            }
        },
        speaker: {
            id: 1,
            name: 'Capatina Alexandra'
        },
        status: 'Joined'
    },
    {
        id: 2,
        name: "Introduction in React",
        startDate: "15 / 10 / 2020",
        endDate: "16 / 10 / 2020",
        type: 'Remote',
        category: 'IT Software',
        location: {
            id: 2,
            county: {
                id: 3,
                name: 'Bucharest'
            },
            country: {
                id: 4,
                name: 'Romania'
            }
        },
        speaker: {
            id: 2,
            name: 'Capatina Alexandra'
        },
        status: 'Attend'
    },
    {
        id: 3,
        name: "Introduction in GraphQL",
        startDate: "17 / 10 / 2020",
        endDate: "18 / 10 / 2020",
        type: 'Remote',
        category: 'IT Software',
        location: {
            id: 3,
            county: {
                id: 5,
                name: 'Bucharest'
            },
            country: {
                id: 6,
                name: 'Romania'
            }
        },
        speaker: {
            id: 2,
            name: 'Capatina Alexandra'
        },
        status: 'Joined'
    }
]

export default conferences;