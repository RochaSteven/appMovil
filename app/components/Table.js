import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, RefreshControl, SafeAreaView, ScrollView, } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
export default App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch('http://192.168.100.26:3030/donadores')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (

    <View style={{ flex: 1, padding: 24,backgroundColor: 'pink' }}>
    
       <SafeAreaView style={{flex:1}} >
      <ScrollView
        contentContainerStyle={{flex: 1,alignItems: 'center',
        justifyContent: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />

          
        }
      >
          {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.nombre}</Text>
          <Text style={{ fontSize: 14, color: 'green', textAlign: 'center', paddingBottom: 10}}>Lista de donadores</Text>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.id + '. ' + item.nombre + ' ' + item.apellido}</Text>
            )}
          />
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
    </View>
    
  );
};

