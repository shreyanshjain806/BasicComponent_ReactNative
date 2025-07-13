import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  SectionList,
  VirtualizedList,
  ScrollView,
  RefreshControl,
  Dimensions,
  PixelRatio,
  StyleSheet,
} from 'react-native';

export default function ListViewScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const flatListData = Array.from({ length: 8 }, (_, i) => ({ key: `Item ${i}` }));
  const sectionListData = [
    { title: 'Section 1', data: ['Item 1', 'Item 2'] },
    { title: 'Section 2', data: ['Item 3', 'Item 4'] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={styles.title}>List View Screen</Text>

        <FlatList
          data={flatListData}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.key}</Text>}
          keyExtractor={item => item.key}
        />

        <SectionList
          sections={sectionListData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />

        <VirtualizedList
          data={flatListData}
          initialNumToRender={5}
          getItem={(data, index) => data[index]}
          getItemCount={data => data.length}
          renderItem={({ item }) => <Text style={styles.listItem}>{item.key}</Text>}
          keyExtractor={item => item.key}
        />

        <Text>
          Dimensions: {Dimensions.get('window').width} x {Dimensions.get('window').height}
        </Text>
        <Text>Pixel Ratio: {PixelRatio.get()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  listItem: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  sectionHeader: { fontWeight: 'bold', backgroundColor: '#eee', padding: 4 },
});
