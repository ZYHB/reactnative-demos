/* eslint-disable no-shadow */
import * as React from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import {RouteNames, router} from '~/navigator/NavigationService';

export default function ResumeForm({navigation}) {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    avatarUrl: '',
    profTitle: '',
    phoneNo: '',
    email: '',
    website: '',
    company: '',
    jobTitle: '',
    jobStartDate: '',
    jobEndDate: '',
    experience: '',
    profSummary: '',
    certificate: '',
    collegeName: '',
    colStartDate: '',
    colEndDate: '',
    skill: '',
    hobby: '',
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.cont}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Resume Builder</Text>
          </View>

          <View style={styles.details}>
            <Text style={styles.titleText}>Personal Details</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter your full name"
              value={userDetails.fullName}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{fullName: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your avatar URL"
              value={userDetails.avatarUrl}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{avatarUrl: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your professional title"
              value={userDetails.profTitle}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{profTitle: e},
                }));
              }}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.titleText}>Contact Details</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter your phone number"
              value={userDetails.phoneNo}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{phoneNo: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your email"
              value={userDetails.email}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{email: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your website link"
              value={userDetails.website}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{website: e},
                }));
              }}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.titleText}>Previous Job</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter company name"
              value={userDetails.company}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{company: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter job title"
              value={userDetails.jobTitle}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{jobTitle: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter start date (e.g. 11/11/2022)"
              value={userDetails.jobStartDate}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{jobStartDate: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter end date (e.g. 12/11/2022)"
              value={userDetails.jobEndDate}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{jobEndDate: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Describe your experience"
              value={userDetails.experience}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{experience: e},
                }));
              }}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.titleText}>Profile Details</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter your profile summary"
              value={userDetails.profSummary}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{profSummary: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your certificate"
              value={userDetails.certificate}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{certificate: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your college name"
              value={userDetails.collegeName}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{collegeName: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter start date (e.g. 11/11/2022)"
              value={userDetails.colStartDate}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{colStartDate: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter end date (e.g. 12/11/2022)"
              value={userDetails.colEndDate}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{colEndDate: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your best skill"
              value={userDetails.skill}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{skill: e},
                }));
              }}
            />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your hobby"
              value={userDetails.hobby}
              onChangeText={e => {
                setUserDetails(userDetails => ({
                  ...userDetails,
                  ...{hobby: e},
                }));
              }}
            />
          </View>

          <Button
            title="Create Resume"
            style={styles.button}
            onPress={() => router.push(RouteNames.Bottomtabs, userDetails)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#36485f',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  details: {
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    borderBottomColor: '#199187',
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  titleText: {
    fontWeight: 'bold',
    color: 'yellow',
    fontSize: 15,
    marginBottom: 10,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    color: '#d3d3d3',
    marginBottom: 20,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#59cbbd',
    marginTop: 5,
    marginBottom: 20,
  },
});
