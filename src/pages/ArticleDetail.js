// src/pages/ArticleDetail.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Constant } from '../utils/Constant';

export default function ArticleDetail({ route }) {
  const { article } = route.params || {};

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Article non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.contentText}>
          {article.content || "Contenu de l'article à venir..."}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.couleur.blanc,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: Constant.espacement.grand,
  },
  title: {
    fontSize: Constant.typographie.titre,
    fontWeight: 'bold',
    color: Constant.couleur.secondaire,
    marginBottom: Constant.espacement.moyen,
  },
  contentText: {
    fontSize: Constant.typographie.corps,
    color: Constant.couleur.texte,
    lineHeight: 24,
  },
  errorText: {
    fontSize: Constant.typographie.corps,
    color: Constant.couleur.texte,
    textAlign: 'center',
    marginTop: Constant.espacement.grand,
  },
});