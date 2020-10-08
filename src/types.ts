interface ProfileResponse {
    role: {
        hacker: boolean;
        volunteer: boolean;
        judge: boolean;
        sponsor: boolean;
        mentor: boolean;
        organizer: boolean;
        director: boolean;
    };

    first_name: string;
    last_name: string;
    gender: string;
    ethnicity: string;
    phone_number: string;
    date_of_birth: string;

    registration_status: string;

    day_of: {
        checkIn: boolean;
    };

    school: string;
    major: string;
    level_of_study: string;
    how_you_heard_about_hackru: string;
    hackathon_count: number;
    short_answer: string;
    github: string;
    reasons: string;
    votes: number;

    swag: {
        accepting_swag: boolean;
        swag_address: string;
    };
    shirt_size: string;

    dietary_restrictions: string;
    special_needs: string;
}

export {ProfileResponse};
