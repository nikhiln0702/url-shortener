import express from 'express';
import shortid from 'shortid';
import Url from '../models/Url.js';

export const shortenUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const shortCode = shortid.generate();
        const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

        const newUrl = new Url({ originalUrl, shortCode });
        await newUrl.save();

        res.json({ shortUrl });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const shortCode= async (req, res) => {
    try {
        const { shortCode } = req.params;
        const url = await Url.findOne({ shortCode: shortCode });

        if (!url) return res.status(404).json({ error: 'URL not found' });

        url.visits++;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const admin= async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
