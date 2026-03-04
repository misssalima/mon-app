import React from 'react'
import { TabBar } from '@ant-design/react-native'
import { HomeFilled, InfoCircleFilled, UserAddOutlined } from '@ant-design/icons'


import Accueil from './Accueil'
import APropos from './APropos'
import MonCompte from './MonCompte'
import { Constant } from './Constant'
import { Text, View } from 'react-native'

export default class Tabbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'redTab', 
    }
  }

  onChangeTab(tabName) {
    this.setState({ selectedTab: tabName })
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor={Constant.couleur.primaire}
        barTintColor="#f5f5f5"
      >
        {/*  A PROPOS */}
        <TabBar.Item
          title="A Propos"
          icon={
            <InfoCircleFilled
              style={{
                color: this.state.selectedTab === 'blueTab'
                  ? Constant.couleur.primaire
                  : Constant.couleur.noir,
              }}
            />
          }
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}
        >
          <APropos />
        </TabBar.Item>

        {/*  ACCUEIL */}
        <TabBar.Item
          title="Accueil"
          icon={
            <HomeFilled
              style={{
                color: this.state.selectedTab === 'redTab'
                  ? Constant.couleur.primaire
                  : Constant.couleur.noir,
              }}
            />
          }
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => this.onChangeTab('redTab')}
        >
          <Accueil />
        </TabBar.Item>

        {/*  MON COMPTE */}
        <TabBar.Item
          title="Mon compte"
          icon={
            <UserAddOutlined
              style={{
                color: this.state.selectedTab === 'yellowTab'
                  ? Constant.couleur.primaire
                  : Constant.couleur.noir,
              }}
            />
          }
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
          <MonCompte />
        </TabBar.Item>
      </TabBar>
    )
  }
}
