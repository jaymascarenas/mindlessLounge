import { Request, Response } from 'express';

// Profile picture URLs and their metadata
export const PROFILE_PICTURES = [
    {
        id: 1,
        url: 'https://i.imgur.com/SI1jDAi.jpg',
        name: 'Chill Mind'
    },
    {
        id: 2,
        url: 'https://i.imgur.com/30I29u5.jpg',
        name: 'Brainwave vibes'
    },
    {
        id: 3,
        url: 'https://i.imgur.com/MA3q9ex.jpg',
        name: 'Sip & Think'
    },
    {
        id: 4,
        url: 'https://i.imgur.com/AiT5zrR.jpg',
        name: 'Floating Genius'
    },
    {
        id: 5,
        url: 'https://i.imgur.com/bR2866f.jpg',
        name: 'Lost in Thought'
    },
    {
        id: 6,
        url: 'https://i.imgur.com/JHFvhSb.jpg',
        name: 'Zen Mode'
    },
    {
        id: 7,
        url: 'https://i.imgur.com/FV5lAUA.jpg',
        name: 'Dreamy Lounge'
    },
    {
        id: 8,
        url: 'https://i.imgur.com/FKsRmVG.jpg',
        name: 'Mind Drifter'
    },
    {
        id: 9,
        url: 'https://i.imgur.com/IFV7nDE.jpg',
        name: 'Standoff'
    }
];

// Controller functions
export const getProfilePictures = (req: Request, res: Response) => {
    try {
        res.json({
            success: true,
            profilePictures: PROFILE_PICTURES
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile pictures'
        });
    }
};

export const validateProfilePicture = (url: string): boolean => {
    return PROFILE_PICTURES.some(pic => pic.url === url);
};