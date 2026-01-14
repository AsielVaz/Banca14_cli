import { Image } from "expo-image";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000000" : "#f5f6fa" },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/favicon.png")}
          style={styles.logo}
          contentFit="contain"
        />

        <View style={styles.headerIcons}>
          <Ionicons
            name="moon-outline"
            size={22}
            color={isDark ? "#e5e7eb" : "#374151"}
          />
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={isDark ? "#e5e7eb" : "#374151"}
          />
        </View>
      </View>

      {/* BREADCRUMB */}
      <Text
        style={[styles.breadcrumb, { color: isDark ? "#9ca3af" : "#6b7280" }]}
      >
        Inicio <Text style={styles.breadcrumbSeparator}>›</Text> Inicio Banca
      </Text>

      {/* CARD SALDO */}
      <View
        style={[
          styles.saldoCard,
          { backgroundColor: isDark ? "#111827" : "#d6d6d6" },
        ]}
      >
        <View>
          <Text
            style={[styles.nombre, { color: isDark ? "#f9fafb" : "#111827" }]}
          >
            ASIEL
          </Text>
          <Text
            style={[styles.nombre, { color: isDark ? "#f9fafb" : "#111827" }]}
          >
            VAZQUEZ
          </Text>
          <Text
            style={[styles.nombre, { color: isDark ? "#f9fafb" : "#111827" }]}
          >
            RIVAS
          </Text>
        </View>

        <View style={styles.saldoRight}>
          <Text style={styles.saldoLabel}>Saldo de la cuenta</Text>
          <Text style={styles.saldoMonto}>$0.01</Text>
        </View>
      </View>

      {/* BOTÓN RETIRAR */}
      <View style={styles.retirarContainer}>
        <TouchableOpacity
          style={styles.retirarBtn}
          onPress={() => router.push("/retiros")}
        >
          <Ionicons name="arrow-up-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.retirarText}>RETIRAR</Text>
      </View>

      {/* BOTONES ACCIONES */}
      <View style={styles.actions}>
        <ActionButton color="#1e88e5" icon="person" />
        <ActionButton color="#fbc02d" icon="history" />
      </View>

      {/* ÚLTIMO COMPROBANTE */}
      <View
        style={[
          styles.comprobanteCard,
          { backgroundColor: isDark ? "#111827" : "#e5e5e5" },
        ]}
      >
        <View
          style={[
            styles.comprobantePreview,
            { backgroundColor: isDark ? "#1f2933" : "#f3f4f6" },
          ]}
        />
        <Text
          style={[
            styles.comprobanteTitle,
            { color: isDark ? "#f9fafb" : "#111827" },
          ]}
        >
          Último comprobante
        </Text>
        <Text
          style={[
            styles.comprobanteText,
            { color: isDark ? "#9ca3af" : "#374151" },
          ]}
        >
          Retiro: $0.04
        </Text>
        <Text
          style={[
            styles.comprobanteText,
            { color: isDark ? "#9ca3af" : "#374151" },
          ]}
        >
          Retiro banca 14
        </Text>
      </View>
    </ScrollView>
  );
}

/* 🔹 BOTÓN DE ACCIÓN */
function ActionButton({ color, icon }: { color: string; icon: any }) {
  return (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]}>
      <MaterialIcons name={icon} size={26} color="#fff" />
    </TouchableOpacity>
  );
}

/* 🔹 ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 40,
    height: 40,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },

  breadcrumb: {
    marginVertical: 12,
    fontSize: 13,
  },

  breadcrumbSeparator: {
    marginHorizontal: 6,
  },

  saldoCard: {
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nombre: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1,
  },

  saldoRight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  saldoLabel: {
    fontSize: 12,
    color: "#2563eb",
  },

  saldoMonto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },

  retirarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  retirarBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },

  retirarText: {
    marginTop: 6,
    fontWeight: "600",
    color: "#22c55e",
  },

  actions: {
    gap: 12,
  },

  actionBtn: {
    height: 55,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  comprobanteCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },

  comprobantePreview: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },

  comprobanteTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },

  comprobanteText: {
    fontSize: 13,
  },
});
