import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View, StyleSheet, FlatList, ActivityIndicator, Image, ImageBackground } from 'react-native';
import {useEffect} from "react";


export default function App() {
  const [quote, setQuote] = useState([]);

  const getQuote = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
        .then(response => response.json())
        .then(data => {
              console.log(data);
              setQuote(data);
            }
        )
  }
  useEffect(() => {

    (async () => {
      getQuote()
    })();

  }, []);


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
