import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { User, CreditCard, Calendar } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const StudentCard = ({ student }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <User color="#4F46E5" size={24} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nom}>{student.nom}</Text>
          <Text style={styles.label}>Étudiant</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <CreditCard color="#6B7280" size={18} />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>CIN</Text>
            <Text style={styles.detailValue}>{student.cin}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Calendar color="#6B7280" size={18} />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Date de Naissance</Text>
            <Text style={styles.detailValue}>{student.dateNaissance}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    width: width - 40,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  nameContainer: {
    flex: 1,
  },
  nom: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  label: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 15,
  },
  details: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTextContainer: {
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
    marginTop: 1,
  },
});

export default StudentCard;
