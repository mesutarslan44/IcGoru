import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, ghost
    size = 'medium', // small, medium, large
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    style,
    textStyle,
    gradientColors,
    fullWidth = true
}) => {
    const getGradientColors = () => {
        if (gradientColors) return gradientColors;

        switch (variant) {
            case 'primary':
                return ['#667eea', '#764ba2'];
            case 'secondary':
                return ['#11998e', '#38ef7d'];
            case 'danger':
                return ['#f093fb', '#f5576c'];
            case 'warning':
                return ['#f6d365', '#fda085'];
            case 'info':
                return ['#4facfe', '#00f2fe'];
            default:
                return ['#667eea', '#764ba2'];
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 };
            case 'large':
                return { paddingVertical: 18, paddingHorizontal: 32, fontSize: 18 };
            default:
                return { paddingVertical: 14, paddingHorizontal: 24, fontSize: 16 };
        }
    };

    const sizeStyles = getSizeStyles();

    if (variant === 'outline' || variant === 'ghost') {
        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled || loading}
                style={[
                    styles.button,
                    variant === 'outline' && styles.outlineButton,
                    variant === 'ghost' && styles.ghostButton,
                    fullWidth && styles.fullWidth,
                    { paddingVertical: sizeStyles.paddingVertical, paddingHorizontal: sizeStyles.paddingHorizontal },
                    disabled && styles.disabled,
                    style
                ]}
                activeOpacity={0.7}
            >
                {loading ? (
                    <ActivityIndicator color={variant === 'outline' ? '#667eea' : '#666'} />
                ) : (
                    <View style={styles.content}>
                        {icon && iconPosition === 'left' && <Text style={styles.icon}>{icon}</Text>}
                        <Text style={[
                            styles.text,
                            variant === 'outline' && styles.outlineText,
                            variant === 'ghost' && styles.ghostText,
                            { fontSize: sizeStyles.fontSize },
                            textStyle
                        ]}>
                            {title}
                        </Text>
                        {icon && iconPosition === 'right' && <Text style={styles.icon}>{icon}</Text>}
                    </View>
                )}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            style={[fullWidth && styles.fullWidth, style]}
        >
            <LinearGradient
                colors={disabled ? ['#ccc', '#999'] : getGradientColors()}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.gradient,
                    { paddingVertical: sizeStyles.paddingVertical, paddingHorizontal: sizeStyles.paddingHorizontal },
                    disabled && styles.disabled
                ]}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <View style={styles.content}>
                        {icon && iconPosition === 'left' && <Text style={styles.icon}>{icon}</Text>}
                        <Text style={[
                            styles.text,
                            styles.gradientText,
                            { fontSize: sizeStyles.fontSize },
                            textStyle
                        ]}>
                            {title}
                        </Text>
                        {icon && iconPosition === 'right' && <Text style={styles.icon}>{icon}</Text>}
                    </View>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    fullWidth: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
    },
    gradientText: {
        color: '#fff',
    },
    outlineButton: {
        borderWidth: 2,
        borderColor: '#667eea',
        backgroundColor: 'transparent',
    },
    outlineText: {
        color: '#667eea',
    },
    ghostButton: {
        backgroundColor: 'transparent',
    },
    ghostText: {
        color: '#666',
    },
    icon: {
        fontSize: 18,
        marginHorizontal: 6,
    },
    disabled: {
        opacity: 0.6,
    },
});

export default Button;
