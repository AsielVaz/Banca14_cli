import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const isDark = useColorScheme() === "dark";
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [codigo2FA, setCodigo2FA] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const colors = {
    bg: isDark ? "#0b0f1a" : "#eef1f6",
    card: isDark ? "#111827" : "#e9edf3",
    input: isDark ? "#1f2937" : "#f1f5f9",
    text: isDark ? "#f9fafb" : "#1f2937",
    muted: isDark ? "#9ca3af" : "#6b7280",
    accent: "#2563eb",
  };

  // 🔐 LOGIN REAL
  const handleLogin = async () => {
    if (!correo || !password || !codigo2FA) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://banca.sistema14.com/api/adminLoginApp.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            usuario: correo,
            password: password,
            "2fa": codigo2FA,
          }).toString(),
        }
      );

      const text = await response.text();
      console.log("Respuesta login:", text);

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta inválida del servidor");
      }

      if (data.estatus === "exito" && data.tokenApp) {
        // 💾 Guardar tokenApp
        await AsyncStorage.setItem("tokenApp", data.tokenApp);
        console.log("tokenApp guardado");

        // 🚀 Entrar a la app
        router.replace("/");
      } else {
        Alert.alert("Login inválido", data.mensaje || "Credenciales incorrectas");
      }

    } catch (error: any) {
      console.error("Error en login:", error);
      Alert.alert("Error", error.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* LOGO */}
        <View style={styles.logoWrapper}>
          <Image
            source={require("@/assets/images/favicon.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <Text style={[styles.title, { color: colors.text }]}>
          Banca14
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Inicia sesión para continuar
        </Text>

        {/* CORREO */}
        <View style={[styles.inputContainer, { backgroundColor: colors.input }]}>
          <Ionicons name="mail-outline" size={20} color={colors.muted} />
          <TextInput
            value={correo}
            onChangeText={setCorreo}
            placeholder="Correo electrónico"
            placeholderTextColor={colors.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, { color: colors.text }]}
          />
        </View>

        {/* PASSWORD */}
        <View style={[styles.inputContainer, { backgroundColor: colors.input }]}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.muted} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            placeholderTextColor={colors.muted}
            secureTextEntry={!showPassword}
            style={[styles.input, { color: colors.text }]}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.muted}
            />
          </TouchableOpacity>
        </View>

        {/* 2FA */}
        <View style={[styles.inputContainer, { backgroundColor: colors.input }]}>
          <MaterialIcons name="security" size={20} color={colors.muted} />
          <TextInput
            value={codigo2FA}
            onChangeText={setCodigo2FA}
            placeholder="Código 2FA"
            placeholderTextColor={colors.muted}
            keyboardType="number-pad"
            style={[styles.input, { color: colors.text }]}
          />
        </View>

        {/* BOTÓN */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>

        <Text style={[styles.footer, { color: colors.muted }]}>
          SISTEMA 14
        </Text>
      </View>
    </View>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    borderRadius: 28,
    padding: 28,
    elevation: 10,
  },

  logoWrapper: {
    alignSelf: "center",
    marginBottom: 16,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },

  logo: {
    width: 40,
    height: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  button: {
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 12,
    letterSpacing: 1,
  },
});
