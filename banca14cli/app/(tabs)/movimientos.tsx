import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* 🔹 MODELO */
type Movimiento = {
  id: string;
  monto: string;
  folio: string;
  fecha: string;
};

export default function MovimientosScreen() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);

  /* 📡 CARGAR MOVIMIENTOS */
  const cargarMovimientos = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenApp");
      if (!token) return;

      const response = await fetch(
        "https://sistema14.com/app/api/bancaPagosApi.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            token,
          }).toString(),
        }
      );

      const data = await response.json();
      console.log("Movimientos API:", data);

      const parseados: Movimiento[] = data.map((m: any) => ({
        id: m.id,
        monto: `$${Number(m.monto).toFixed(2)}`,
        folio: m.folio,
        fecha: formatearFecha(m.fecha_creacion),
      }));

      setMovimientos(parseados);
    } catch (error) {
      console.error("Error cargando movimientos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMovimientos();
  }, []);

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
        style={[
          styles.breadcrumb,
          { color: isDark ? "#9ca3af" : "#6b7280" },
        ]}
      >
        Movimientos <Text style={styles.separator}>›</Text> Comprobantes
      </Text>

      {/* LOADER */}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      )}

      {/* LISTA */}
      {!loading &&
        movimientos.map(item => (
          <MovimientoItem key={item.id} {...item} isDark={isDark} />
        ))}
    </ScrollView>
  );
}

/* 🔹 ITEM */
function MovimientoItem({
  monto,
  folio,
  fecha,
  isDark,
}: {
  monto: string;
  folio: string;
  fecha: string;
  isDark: boolean;
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#111827" : "#ffffff",
        },
      ]}
    >
      {/* TEXTO VERTICAL */}
      <View style={styles.verticalContainer}>
        <Text style={[styles.verticalText, { color: "#9ca3af" }]}>
          Banca 14
        </Text>
      </View>

      {/* ICONO */}
      <Ionicons name="arrow-up-outline" size={26} color="#ef4444" />

      {/* INFO */}
      <View style={styles.info}>
        <Text
          style={[
            styles.title,
            { color: isDark ? "#f9fafb" : "#111827" },
          ]}
        >
          Retiro banca 14,{" "}
          <Text style={styles.ref}>Referencia {folio}</Text>
        </Text>

        <Text
          style={{
            color: isDark ? "#9ca3af" : "#6b7280",
            fontSize: 12,
          }}
        >
          {fecha}
        </Text>
      </View>

      {/* MONTO */}
      <View style={styles.right}>
        <Text
          style={{
            fontWeight: "600",
            color: isDark ? "#e5e7eb" : "#374151",
          }}
        >
          {monto}
        </Text>
        <TouchableOpacity>
          <MaterialIcons name="picture-as-pdf" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* 🔹 FECHA */
function formatearFecha(fecha: string) {
  const d = new Date(fecha.replace(" ", "T"));
  return d.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* 🎨 ESTILOS */
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
    width: 36,
    height: 36,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },

  breadcrumb: {
    marginVertical: 16,
    fontSize: 13,
  },

  separator: {
    marginHorizontal: 6,
  },

  loader: {
    marginTop: 40,
  },

  card: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },

  verticalContainer: {
    position: "absolute",
    left: -5,
    top: "50%",
    transform: [{ rotate: "-90deg" }, { translateY: -10 }],
  },

  verticalText: {
    fontSize: 10,
    letterSpacing: 1,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 14,
    fontWeight: "500",
  },

  ref: {
    color: "#3b82f6",
  },

  right: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
});
