// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
} from 'react-native';

import FormattedText from 'app/components/formatted_text';
import QuickTextInput from 'app/components/quick_text_input';
import {changeOpacity, makeStyleSheetFromTheme} from 'app/utils/theme';

export default class AccountSettingsItem extends PureComponent {
    static propTypes = {
        disabled: PropTypes.bool,
        field: PropTypes.string.isRequired,
        format: PropTypes.shape({
            id: PropTypes.string.isRequired,
            defaultMessage: PropTypes.string.isRequired,
        }),
        helpText: PropTypes.string,
        maxLength: PropTypes.number,
        optional: PropTypes.bool,
        theme: PropTypes.object.isRequired,
        updateValue: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    static defaultProps = {
        optional: false,
        disabled: false,
    };

    onChangeText = (value) => {
        const {field, updateValue} = this.props;
        updateValue({[field]: value});
    };

    render() {
        const {
            theme,
            format,
            helpText,
            optional,
            disabled,
            value,
        } = this.props;
        const style = getStyleSheet(theme);

        return (
            <View>
                <View style={style.titleContainer15}>
                    <FormattedText
                        style={style.title}
                        id={format.id}
                        defaultMessage={format.defaultMessage}
                    />
                    {optional && (
                        <FormattedText
                            style={style.optional}
                            id='channel_modal.optional'
                            defaultMessage='(optional)'
                        />
                    )}
                </View>
                <View style={style.inputContainer}>
                    <View style={disabled ? style.disabled : null}>
                        <QuickTextInput
                            ref={this.channelNameRef}
                            value={value}
                            onChangeText={this.onChangeText}
                            style={style.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            maxLength={this.props.maxLength}
                            editable={!disabled}
                            underlineColorAndroid='transparent'
                            disableFullscreenUI={true}
                        />
                    </View>
                    {disabled &&
                    <Text style={style.helpText}>
                        {helpText}
                    </Text>
                    }
                </View>
            </View>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        inputContainer: {
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderTopColor: changeOpacity(theme.centerChannelColor, 0.1),
            borderBottomColor: changeOpacity(theme.centerChannelColor, 0.1),
            backgroundColor: theme.centerChannelBg,
        },
        input: {
            color: theme.centerChannelColor,
            fontSize: 14,
            height: 40,
            paddingHorizontal: 15,
        },
        disabled: {
            backgroundColor: changeOpacity(theme.centerChannelColor, 0.1),
        },
        title: {
            fontSize: 14,
            color: theme.centerChannelColor,
            marginLeft: 15,
        },
        titleContainer15: {
            flexDirection: 'row',
            marginTop: 15,
        },
        optional: {
            color: changeOpacity(theme.centerChannelColor, 0.5),
            fontSize: 14,
            marginLeft: 5,
        },
        helpText: {
            fontSize: 12,
            color: changeOpacity(theme.centerChannelColor, 0.5),
            marginHorizontal: 15,
            marginVertical: 10,
        },
    };
});
