// src/AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Créer un contexte
export const AppContext = createContext();

// Composant provider pour partager les données dans toute l'application
export const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // Charger les projets depuis AsyncStorage au démarrage de l'application
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedProjects = await AsyncStorage.getItem('projects');
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        }
      } catch (error) {
        console.error('Error loading data', error);
      }
    };
    loadData();
  }, []);

  // Sauvegarder les projets dans AsyncStorage à chaque mise à jour
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('projects', JSON.stringify(projects));
      } catch (error) {
        console.error('Error saving data', error);
      }
    };
    if (projects.length > 0) {
      saveData();
    }
  }, [projects]);

  // Fonction pour mettre à jour un jour dans un projet
  const toggleDay = (projectId, dayIndex) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedDays = project.days.map((day, index) => {
          if (index === dayIndex) {
            return { ...day, checked: !day.checked };
          }
          return day;
        });

        const streak = updatedDays.filter((day) => day.checked).length;

        return { ...project, days: updatedDays, streak };
      }
      return project;
    });

    setProjects(updatedProjects);
  };

  // Ajouter un projet
  const addProject = (name) => {
    const newProject = {
      id: `${projects.length + 1}`,
      name: name,
      streak: 0,
      days: [
        { abbreviation: 'Lun', checked: false },
        { abbreviation: 'Mar', checked: false },
        { abbreviation: 'Mer', checked: false },
        { abbreviation: 'Jeu', checked: false },
        { abbreviation: 'Ven', checked: false },
        { abbreviation: 'Sam', checked: false },
        { abbreviation: 'Dim', checked: false },
      ],
    };

    setProjects([...projects, newProject]);
  };

  return (
    <AppContext.Provider value={{ projects, toggleDay, addProject }}>
      {children}
    </AppContext.Provider>
  );
};
