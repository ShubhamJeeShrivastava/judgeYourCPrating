console.log("Node is working");
try {
    const express = require('express');
    console.log("Express loaded");
    const { getUserStats } = require('./cf_scraper');
    console.log("Scraper loaded");
} catch (e) {
    console.error("Error loading modules:", e);
}
