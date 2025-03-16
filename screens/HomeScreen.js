import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AppContext } from './src/AppContext'; // Importer le context

// Représente chaque projet
const ProjectItem = ({ project }) => {
  const { toggleDay } = useContext(AppContext); // Utiliser le contexte pour changer l'état

  const totalDays = 7;
  const completedDays = project.days.filter(day => day.checked).length;
  const fillPercentage = (completedDays / totalDays) * 100;

  return (
    <View style={[styles.projectContainer, { backgroundColor: `rgba(0, 255, 0, ${fillPercentage / 100})` }]}>
      <Text style={styles.projectTitle}>{project.name}</Text>
      <View style={styles.daysContainer}>
        {project.days.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleDay(project.id, index)}
            style={styles.dayButton}
          >
            <View style={styles.circle}>
              {day.checked && <Text style={styles.checkedText}>❌</Text>}
            </View>
            <Text style={styles.dayLabel}>{day.abbreviation}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.streak}>Streak: {project.streak}</Text>
    </View>
  );
};

// Page d'accueil
export default function Home() {
  const { projects, addProject } = useContext(AppContext); // Accéder au context

  // Fonction pour ajouter un projet (en bas)
  const handleAddProject = () => {
    addProject('Nouveau Projet');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        renderItem={({ item }) => <ProjectItem project={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.projectsList}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProject}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  projectsList: {
    marginBottom: 80, // pour faire de la place au bouton "+"
  },
  projectContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dayButton: {
    marginRight: 10,
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedText: {
    fontSize: 16,
    color: 'red',
  },
  dayLabel: {
    marginTop: 5,
  },
  streak: {
    marginTop: 10,
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -20 }],
    width: 40,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});
