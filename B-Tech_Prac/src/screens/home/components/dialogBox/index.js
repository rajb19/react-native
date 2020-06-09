import React from "react";
import Modal from 'react-native-modal';
import moment from "moment";
import { TouchableOpacity, View, Text, Image, Linking } from "react-native";

// custom imports
import styles from "./style";
import { Icons } from "../../../../common/constants";
import { capitalize } from "../../../../common/utility";

class PostDialog extends React.PureComponent {
  render() {
    const { post, onClose } = this.props;
    return (
      <Modal
        isVisible={true}
        backdropColor='transparent'
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.iconCloseContainer}>
            <Image source={Icons.CLOSE} style={styles.iconClose} />
          </TouchableOpacity>
          <View style={styles.placeholderContainer}>
            <Text style={styles.iconPlaceholder}>{capitalize(post.author.charAt(0))}</Text>
          </View>
          <View style={styles.itemContentContainer}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textWhite} >{post.title}</Text>
            </View>
            {post.url &&
              <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.6}
                onPress={() => { Linking.openURL(post.url); }}>
                <Text style={styles.itemUrl}>{post.url}</Text>
              </TouchableOpacity>}
            <View style={styles.itemContent}>
              <View style={{ flexDirection: 'row' }} >
                <Text style={[styles.textWhite, { fontWeight: 'bold' }]}>Author: </Text>
                <Text style={styles.textWhite}>{capitalize(post.author)}</Text>
              </View>
              <Text style={styles.textWhite}>{moment(post.created_at).format("Do MMM YYYY")}</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default PostDialog;