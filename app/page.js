'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import the map component to avoid SSR issues
const HealthMap = dynamic(() => import('./map'), { 
  ssr: false,
  loading: () => <div className="map-container loading">Loading Map...</div>
});

const getStatus = (heartRate, spO2) => {
  if (heartRate < 50 || heartRate > 120 || spO2 < 90) return 'danger';
  if (heartRate < 60 || heartRate > 100 || spO2 < 95) return 'warning';
  return 'normal';
};

export default function Home() {
  const [vitals, setVitals] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVitals = async () => {
    try {
      const res = await fetch('/api/vitals');
      const data = await res.json();
      if (!data.error && data.heartRate !== undefined) {
        setVitals(data);
      }
    } catch (err) {
      console.error('Error fetching vitals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
    const interval = setInterval(fetchVitals, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Initializing Dashboard...</div>;

  const status = vitals ? getStatus(vitals.heartRate, vitals.spO2) : 'normal';

  return (
    <main>
      <header>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          HealthGuard AI
        </motion.h1>
        <p className="vital-label">Patient Monitoring System (Live)</p>
      </header>

      <div className="dashboard-grid">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="vital-label">Heart Rate</div>
          <div className="vital-value" style={{ color: 'var(--primary)' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={vitals?.heartRate}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {vitals?.heartRate || '--'}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>BPM</span>
          </div>
          <p style={{ opacity: 0.6 }}>Normal range: 60-100 BPM</p>
        </motion.div>

        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="vital-label">SpO2 (Oxygen)</div>
          <div className="vital-value" style={{ color: 'var(--secondary)' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={vitals?.spO2}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {vitals?.spO2 || '--'}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>%</span>
          </div>
          <p style={{ opacity: 0.6 }}>Healthy: 95% - 100%</p>
        </motion.div>

        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="vital-label">Patient Status</div>
          <div className="vital-value" style={{ 
            color: status === 'danger' ? 'var(--danger)' : 
                   status === 'warning' ? 'var(--warning)' : 
                   'var(--normal)' 
          }}>
            <span className={`status-dot status-${status}`} />
            {status.toUpperCase()}
          </div>
          <p style={{ opacity: 0.6 }}>Based on latest measurements</p>
        </motion.div>
      </div>

      <div style={{ padding: '0 2rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="vital-label" style={{ marginBottom: '1rem' }}>Patient Live Location</h2>
          {vitals && <HealthMap lat={vitals.lat} lng={vitals.lng} />}
          {!vitals && <div className="map-container loading">Waiting for GPS data...</div>}
        </motion.div>
      </div>

      <footer style={{ textAlign: 'center', padding: '2rem', opacity: 0.4, fontSize: '0.8rem' }}>
        Last updated: {vitals ? new Date(vitals.createdAt).toLocaleTimeString() : 'Never'}
      </footer>
    </main>
  );
}
