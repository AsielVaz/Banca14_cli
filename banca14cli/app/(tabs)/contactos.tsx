import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* 🔹 MODELO */
type Contacto = {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  cuenta: string;
};

const API_URL = "https://sistema14.com/app/api/bancaContactosApi.php";

export default function ContactosScreen() {
  const isDark = useColorScheme() === "dark";

  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [loading, setLoading] = useState(true);

  /* 📡 CARGAR CONTACTOS */
  const cargarContactos = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenApp");
      if (!token) return;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          token,
          accion: "dameContactos",
        }).toString(),
      });

      const text = await response.text();

      // ⚠️ El backend imprime JSON suelto + array, tomamos SOLO el array final
      const match = text.match(/\[[\s\S]*\]$/);
      if (!match) throw new Error("Respuesta inválida");

      const data = JSON.parse(match[0]);

      setContactos(
        data.map((c: any) => ({
          id: Number(c.id),
          nombre: c.nombre,
          telefono: c.telefono || "",
          correo: c.correo || "",
          cuenta: c.numero || "",
        }))
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  /* ➕ NUEVO CONTACTO */
  const agregarContacto = () => {
    setContactos(prev => [
      {
        id: 0,
        nombre: "",
        telefono: "",
        correo: "",
        cuenta: "",
      },
      ...prev,
    ]);
  };

  /* 💾 GUARDAR */
  const guardarContacto = async (c: Contacto) => {
    const token = await AsyncStorage.getItem("tokenApp");
    if (!token) return;

    const body: any = {
      token,
      accion: "guardar",
      nombre: c.nombre,
      numero: c.cuenta,
      telefono: c.telefono,
      correo: c.correo,
    };

    if (c.id !== 0) body.id = c.id;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body).toString(),
    });

    cargarContactos();
  };

  /* 🗑️ ELIMINAR */
  const eliminarContacto = async (id: number) => {
    const token = await AsyncStorage.getItem("tokenApp");
    if (!token) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        token,
        accion: "eliminar",
        id: id.toString(),
      }).toString(),
    });

    // eliminar visual inmediato
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  /* 🌀 LOADER */
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: isDark ? "#020617" : "#f5f6fa" }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={[styles.title, { color: isDark ? "#f9fafb" : "#111827" }]}>
          Contactos
        </Text>

        {contactos.map(c => (
          <ContactoCard
            key={`${c.id}-${c.nombre}`}
            contacto={c}
            isDark={isDark}
            onSave={guardarContacto}
            onDelete={eliminarContacto}
          />
        ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={agregarContacto}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

/* 🧾 CARD */
function ContactoCard({
  contacto,
  isDark,
  onSave,
  onDelete,
}: {
  contacto: Contacto;
  isDark: boolean;
  onSave: (c: Contacto) => void;
  onDelete: (id: number) => void;
}) {
  const [edit, setEdit] = useState(contacto.id === 0);
  const [form, setForm] = useState(contacto);
  const [loading, setLoading] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const guardar = async () => {
    setLoading(true);
    await onSave(form);
    setLoading(false);
    setEdit(false);
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? "#020617" : "#ffffff" },
      ]}
    >
      {/* HEADER */}
      <View style={styles.cardHeader}>
        {edit ? (
          <TextInput
            value={form.nombre}
            onChangeText={v => setForm({ ...form, nombre: v })}
            placeholder="Nombre del contacto"
            placeholderTextColor="#9ca3af"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#020617" : "#f9fafb",
                color: isDark ? "#f9fafb" : "#111827",
              },
            ]}
          />
        ) : (
          <Text
            style={[
              styles.cardTitle,
              { color: isDark ? "#f9fafb" : "#111827" },
            ]}
            numberOfLines={2}
          >
            {form.nombre}
          </Text>
        )}

        <View style={styles.cardActions}>
          {!edit && (
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Ionicons name="pencil-outline" size={18} color="#3b82f6" />
            </TouchableOpacity>
          )}

          {edit && form.id !== 0 && (
            <TouchableOpacity onPress={() => setMostrarConfirmacion(true)}>
              <Ionicons name="trash-outline" size={18} color="#ef4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* BODY */}
      <Campo
        label="Cuenta / CLABE / Tarjeta"
        value={form.cuenta}
        editable={edit}
        onChange={v => setForm({ ...form, cuenta: v })}
        isDark={isDark}
        icon="card-outline"
      />

      <Campo
        label="Teléfono"
        value={form.telefono}
        editable={edit}
        onChange={v => setForm({ ...form, telefono: v })}
        isDark={isDark}
        icon="call-outline"
      />

      <Campo
        label="Correo electrónico"
        value={form.correo}
        editable={edit}
        onChange={v => setForm({ ...form, correo: v })}
        isDark={isDark}
        icon="mail-outline"
      />

      {edit && (
        <TouchableOpacity style={styles.saveBtn} onPress={guardar}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Guardar contacto</Text>
          )}
        </TouchableOpacity>
      )}

      {/* 🧩 MODAL CONFIRMACIÓN */}
      <Modal visible={mostrarConfirmacion} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: isDark ? "#020617" : "#ffffff" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDark ? "#f9fafb" : "#111827" },
              ]}
            >
              ¿Eliminar contacto?
            </Text>

            <Text
              style={[
                styles.modalText,
                { color: isDark ? "#9ca3af" : "#374151" },
              ]}
            >
              Esta acción no se puede deshacer.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancel]}
                onPress={() => setMostrarConfirmacion(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.modalDelete]}
                onPress={() => {
                  setMostrarConfirmacion(false);
                  onDelete(form.id);
                }}
              >
                <Text style={styles.modalDeleteText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* 🔹 CAMPO */
function Campo({
  label,
  value,
  editable,
  onChange,
  isDark,
  icon,
}: any) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {editable ? (
        <View style={styles.inputRow}>
          <Ionicons name={icon} size={18} color="#3b82f6" />
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={label}
            placeholderTextColor="#9ca3af"
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#020617" : "#f9fafb",
                color: isDark ? "#f9fafb" : "#111827",
              },
            ]}
          />
        </View>
      ) : (
        <Text style={{ color: isDark ? "#e5e7eb" : "#374151" }}>
          {value || "—"}
        </Text>
      )}
    </View>
  );
}

/* 🎨 ESTILOS */
const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 16 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  title: { fontSize: 22, fontWeight: "600", marginVertical: 16 },

  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },

  cardActions: {
    flexDirection: "row",
    gap: 14,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  saveBtn: {
    marginTop: 8,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },

  /* 🧩 MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  modalText: {
    fontSize: 13,
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },

  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },

  modalCancel: {
    backgroundColor: "#1e293b",
  },

  modalDelete: {
    backgroundColor: "#ef4444",
  },

  modalCancelText: {
    color: "#e5e7eb",
    fontWeight: "500",
  },

  modalDeleteText: {
    color: "#fff",
    fontWeight: "600",
  },
});
