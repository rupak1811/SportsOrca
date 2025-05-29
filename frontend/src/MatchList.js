import React, { useEffect, useState } from 'react';
import './styles.css';

function MatchList() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMatches() {
            try {
                const response = await fetch('/api/upcoming-matches');
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Backend Error Response:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.response && Array.isArray(data.response)) {
                    setMatches(data.response);
                } else {
                    setMatches([]);
                    console.warn('API response format unexpected:', data);
                }

            } catch (error) {
                console.error('Error fetching upcoming matches:', error);
                setError('Failed to load matches. Please try again later.');
            } finally {
                setLoading(false);
            }
        }

        fetchMatches();
    }, []);

    if (loading) {
        return <div className="loading">Loading upcoming matches...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (matches.length === 0) {
        return <div className="error">No upcoming matches found.</div>;
    }

    const formatDateTime = (dateStr, timeStr) => {
        try {
            const [year, month, day] = dateStr.split('-').map(Number);
            const [hours, minutes, seconds] = timeStr.split(':').map(Number);

            const dateObj = new Date(year, month - 1, day, hours, minutes, seconds || 0);

            if (isNaN(dateObj.getTime())) {
                throw new Error('Invalid date parsing');
            }

            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return dateObj.toLocaleString(undefined, options);
        } catch (e) {
            console.error('Error formatting date/time:', e);
            return `${dateStr} ${timeStr}`;
        }
    };

    return (
        <div className="match-list">
            {matches.map(match => (
                <div key={match.idEvent} className="match-card">
                    <div className="teams">
                        <div className="team">
                            <div className="team-name">{match.strHomeTeam}</div>
                        </div>
                        <div className="vs">VS</div>
                        <div className="team">
                            <div className="team-name">{match.strAwayTeam}</div>
                        </div>
                    </div>
                    <div className="match-info">
                        <div>{formatDateTime(match.dateEvent, match.strTime)}</div>
                        <div className="venue">{match.strVenue}</div>
                        <div className="league-name">{match.strLeague}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MatchList; 