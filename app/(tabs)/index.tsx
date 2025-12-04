import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {

  const iconColor = useThemeColor({}, 'text');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#003c8bff', dark: '#003c8bff' }}
      headerImage={
        <Image
          source={require('@/assets/images/Japrax-AmanMap.png')}
          style={styles.headerLogo}
        />
      }
    >

      {/* HERO SECTION */}
      <ThemedView style={styles.hero}>
        <ThemedText type="title" style={styles.heroTitle}>
          Japrax AmanMap
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Jalan aman, hati tenang ✨
        </ThemedText>
      </ThemedView>

      {/* QUICK PANELS */}
      <ThemedView style={styles.quickRow}>
        <ThemedView style={styles.quickCard}>
          <Icon name="warning" size={32} color="#C62828" />
          <ThemedText style={styles.quickText}>Zona Rawan</ThemedText>
        </ThemedView>

        <ThemedView style={styles.quickCard}>
          <Icon name="shield" size={32} color="#C62828" />
          <ThemedText style={styles.quickText}>Rute Polisi</ThemedText>
        </ThemedView>

        <ThemedView style={styles.quickCard}>
          <Icon name="medkit" size={32} color="#C62828" />
          <ThemedText style={styles.quickText}>Rute RS</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* FUNFACT */}
      <ThemedView style={styles.sectionWide}>
        <ThemedView style={styles.sectionHeader}>
          <Icon name="chatbubbles" size={24} color={iconColor} />
          <ThemedText type="subtitle" style={styles.sectionTitle}>Ko Harus Tau!</ThemedText>
        </ThemedView>

        <ThemedText style={styles.sectionText}>
          Banyak tempat di Jayapura yang kalau malam rawan mabuk atau pungli.
          Biasanya cuma dengar dari cerita, tapi sekarang ko bisa cek langsung di peta.
        </ThemedText>
      </ThemedView>

      {/* BACKGROUND + TUJUAN (2 Columns) */}
      <ThemedView style={styles.rowTwo}>

        {/* LATAR BELAKANG */}
        <ThemedView style={styles.colCard}>
          <ThemedView style={styles.sectionHeader}>
            <Icon name="school" size={24} color={iconColor} />
            <ThemedText type="subtitle" style={styles.sectionTitle}>Latar Belakang</ThemedText>
          </ThemedView>

          <ThemedText style={styles.sectionText}>
            Aplikasi ini memakai analisis SIG untuk melihat pola risiko, area rawan,
            dan jalur aman. Tujuannya supaya masyarakat Jayapura bisa dapat
            informasi keamanan yang jelas dan mudah dimengerti.
          </ThemedText>
        </ThemedView>

        {/* TUJUAN */}
        <ThemedView style={styles.colCard}>
          <ThemedView style={styles.sectionHeader}>
            <Icon name="list" size={24} color={iconColor} />
            <ThemedText type="subtitle" style={styles.sectionTitle}>Tujuan</ThemedText>
          </ThemedView>

          <ThemedText style={styles.sectionBullet}>• Melihat area rawan kejahatan.</ThemedText>
          <ThemedText style={styles.sectionBullet}>• Menemukan rute prioritas ke pos polisi.</ThemedText>
          <ThemedText style={styles.sectionBullet}>• Mendapat rute tercepat ke fasilitas kesehatan.</ThemedText>
        </ThemedView>

      </ThemedView>


      {/* CTA */}
      <Link href="/mapwebview" asChild>
      <TouchableOpacity style={styles.ctaButton}>
        <ThemedText style={styles.ctaText}>Mulai Jelajahi Peta</ThemedText>
      </TouchableOpacity>
      </Link>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 210,
    width: 260,
    position: 'absolute',
    bottom: -10,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#003c8bff'
  },
  heroTitle: {
    fontSize: 37,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b62121ff',
  },

  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: -20,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#003c8bff',
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickText: {
    marginTop: 8,
    color: '#F5F6FA',
    fontSize: 14,
  },

  section: {
    backgroundColor: '#003c8bff',
    margin: 16,
    padding: 16,
    borderRadius: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#43c7d6ff',
  },
  sectionText: {
    color: '#FFFFFFCC',
    fontSize: 15,
    lineHeight: 22,
  },
  sectionBullet: {
    color: '#FFFFFFCC',
    fontSize: 15,
    marginTop: 6,
  },

  ctaButton: {
    marginHorizontal: 16,
    marginBottom: 40,
    paddingVertical: 16,
    backgroundColor: '#C62828',
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionWide: {
    backgroundColor: '#003c8bff',
    marginHorizontal: 1,
    padding: 20,
    borderRadius: 14,
  },

  rowTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  colCard: {
    flex: 1,
    backgroundColor: '#003c8bff',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
  },
});
