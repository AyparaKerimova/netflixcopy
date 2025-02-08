import React from "react";
import styles from '../../assets/css/CDashboard.module.css'
const ClientDashboard = () => {
  return (
  <>
    <div className={styles.dashboard}>
      <img className="absolute bottom-0" width={400} src="https://upload.wikimedia.org/wikipedia/commons/9/92/Squid_Game_international_logo.png" alt="squid game" />
      <div className="absolute bottom-12 right-0 bg-gray-500 opacity-80 px-3 py-1">
        <p className="text-white text-lg">16 +</p>
      </div>
    </div>
  </>
  );
};

export default ClientDashboard;
