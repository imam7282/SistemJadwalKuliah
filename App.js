import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  FlatList, 
  SectionList, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';

// ==================== STATIK DATA ====================
const DATA_MATAKULIAH = [
  { id: '1', kode: 'IF-401', nama: 'Pemrograman Mobile', sks: 3, dosen: 'Dr. Ahmad Fauzi' },
  { id: '2', kode: 'IF-302', nama: 'Basis Data Lanjut', sks: 3, dosen: 'Dr. Sari Dewi' },
  { id: '3', kode: 'IF-405', nama: 'Kecerdasan Buatan', sks: 3, dosen: 'Dr. Rian Neldi' },
  { id: '4', kode: 'IF-208', nama: 'Jaringan Komputer', sks: 2, dosen: 'Dr. Putri Indah' },
  { id: '5', kode: 'IF-402', nama: 'Rekayasa Perangkat Lunak', sks: 3, dosen: 'Dr. Hendra Putra' },
];

const DATA_PERTEMUAN = [
  { id: 'm1', matkul: 'Pemrograman Mobile', pertemuan: 1, topik: 'Pengenalan React Native', tanggal: '4 Sep 2026' },
  { id: 'm2', matkul: 'Basis Data Lanjut', pertemuan: 1, topik: 'Review SQL Server', tanggal: '5 Sep 2026' },
  { id: 'm3', matkul: 'Kecerdasan Buatan', pertemuan: 1, topik: 'Intro AI & Machine Learning', tanggal: '6 Sep 2026' },
  { id: 'm4', matkul: 'Pemrograman Mobile', pertemuan: 2, topik: 'Komponen & Props', tanggal: '11 Sep 2026' },
  { id: 'm5', matkul: 'Basis Data Lanjut', pertemuan: 2, topik: 'Indexing & Optimization', tanggal: '12 Sep 2026' },
  { id: 'm6', matkul: 'Jaringan Komputer', pertemuan: 1, topik: 'OSI Model & TCP/IP', tanggal: '13 Sep 2026' },
  { id: 'm7', matkul: 'Rekayasa Perangkat Lunak', pertemuan: 1, topik: 'SDLC & Agile Method', tanggal: '14 Sep 2026' },
  { id: 'm8', matkul: 'Pemrograman Mobile', pertemuan: 3, topik: 'State & Lifecycle', tanggal: '18 Sep 2026' },
  { id: 'm9', matkul: 'Kecerdasan Buatan', pertemuan: 2, topik: 'Searching Algorithms', tanggal: '20 Sep 2026' },
  { id: 'm10', matkul: 'Jaringan Komputer', pertemuan: 2, topik: 'Subnetting IPv4', tanggal: '21 Sep 2026' },
];

const DATA_JADWAL_HARIAN = [
  {
    title: 'Senin',
    data: [
      { id: 'j1', matkul: 'Pemrograman Mobile', ruangan: 'Ruang A301', jam: '08:00 - 10:30' },
      { id: 'j2', matkul: 'Kecerdasan Buatan', ruangan: 'Ruang B202', jam: '13:00 - 15:30' },
    ],
  },
  {
    title: 'Selasa',
    data: [
      { id: 'j3', matkul: 'Basis Data Lanjut', ruangan: 'Ruang C305', jam: '09:00 - 11:30' },
      { id: 'j4', matkul: 'Jaringan Komputer', ruangan: 'Lab Jaringan', jam: '13:00 - 14:40' },
    ],
  },
  {
    title: 'Rabu',
    data: [
      { id: 'j5', matkul: 'Rekayasa Perangkat Lunak', ruangan: 'Ruang A205', jam: '10:00 - 12:30' },
    ],
  },
];

// ==================== HALAMAN 1: MAP ====================
const RingkasanMatkulScreen = () => {
  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.sectionHeaderTitle}>Mata Kuliah Semester Ini</Text>
      {DATA_MATAKULIAH.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.cardTitle}>{item.nama}</Text>
          <Text style={styles.cardSubtitle}>{item.kode} - {item.sks} SKS - {item.dosen}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// ==================== HALAMAN 2: FLATLIST ====================
const DaftarPertemuanScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.matkul} — Pertemuan {item.pertemuan}</Text>
      <Text style={styles.cardSubtitle}>{item.topik} - {item.tanggal}</Text>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator} />;
  
  const renderHeader = () => (
    <View style={styles.flatListHeader}>
      <Text style={styles.headerTextBold}>ListHeaderComponent</Text>
      <Text style={styles.headerTextSub}>Total 10 pertemuan - Semester Ganjil</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Tidak ada data pertemuan tersedia.</Text>
    </View>
  );

  return (
    <FlatList
      data={DATA_PERTEMUAN}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.screenContainerFlat}
    />
  );
};

// ==================== HALAMAN 3: SECTIONLIST ====================
const JadwalHarianScreen = () => {
  return (
    <SectionList
      sections={DATA_JADWAL_HARIAN}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.matkul}</Text>
          <Text style={styles.cardSubtitle}>{item.ruangan} - {item.jam}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      )}
      contentContainerStyle={styles.screenContainerFlat}
    />
  );
};

// ==================== APP UTAMA & NAVIGASI ====================
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Ringkasan');

  const getHeaderTitle = () => {
    if (currentScreen === 'Ringkasan') return 'Jadwal Kuliah';
    if (currentScreen === 'Pertemuan') return 'Daftar Pertemuan';
    return 'Jadwal Mingguan';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Top Header sesuai gambar output */}
      <View style={styles.topHeader}>
        <Text style={styles.topHeaderTitle}>{getHeaderTitle()}</Text>
      </View>

      {/* Konten Utama */}
      <View style={styles.mainContent}>
        {currentScreen === 'Ringkasan' && <RingkasanMatkulScreen />}
        {currentScreen === 'Pertemuan' && <DaftarPertemuanScreen />}
        {currentScreen === 'Jadwal' && <JadwalHarianScreen />}
      </View>

      {/* Bottom Tabs Switcher */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'Ringkasan' && styles.navButtonActive]} 
          onPress={() => setCurrentScreen('Ringkasan')}
        >
          <Text style={[styles.navText, currentScreen === 'Ringkasan' && styles.navTextActive]}>Halaman 1</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'Pertemuan' && styles.navButtonActive]} 
          onPress={() => setCurrentScreen('Pertemuan')}
        >
          <Text style={[styles.navText, currentScreen === 'Pertemuan' && styles.navTextActive]}>Halaman 2</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, currentScreen === 'Jadwal' && styles.navButtonActive]} 
          onPress={() => setCurrentScreen('Jadwal')}
        >
          <Text style={[styles.navText, currentScreen === 'Jadwal' && styles.navTextActive]}>Halaman 3</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topHeader: {
    height: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  topHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  mainContent: {
    flex: 1,
  },
  screenContainer: {
    padding: 16,
  },
  screenContainerFlat: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  flatListHeader: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  headerTextBold: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerTextSub: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  separator: {
    height: 0, 
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  sectionHeader: {
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 4,
  },
  sectionHeaderText: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonActive: {
    backgroundColor: '#f8fafc',
  },
  navText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  navTextActive: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
});