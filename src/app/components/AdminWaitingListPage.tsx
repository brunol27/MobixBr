import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

interface WaitingItem {
    id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    created_at: string;
}

export function AdminWaitingListPage() {
    const [items, setItems] = useState<WaitingItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const fetchItems = async () => {
        setLoading(true);
        setError("");

        try {
            let query = supabase
                .from("waiting_list")
                .select("*")
                .order("created_at", { ascending: false });

            if (search.trim()) {
                const s = search.trim();
                query = query.or(
                    `cpf.ilike.%${s}%,phone.ilike.%${s}%,email.ilike.%${s}%`
                );
            }

            const { data, error } = await query;

            if (error) throw error;
            setItems(data as WaitingItem[]);
        } catch (err: any) {
            setError(err.message || "Erro ao carregar a lista de espera.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchItems();
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="min-h-screen bg-[#f8f9fc] p-6 sm:p-10">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-[#0c2d6b] mb-4">
                    Lista de espera Mobix
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                    Visualize e filtre os pré-cadastros por CPF, telefone ou e-mail.
                </p>

                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row gap-3 mb-4"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar por CPF, telefone ou e-mail"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-[#0c2d6b] text-white text-sm font-semibold disabled:opacity-60"
                    >
                        {loading ? "Carregando..." : "Buscar"}
                    </button>
                </form>

                {error && (
                    <div className="mb-4 text-sm text-red-500">{error}</div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2">Data</th>
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">CPF</th>
                                <th className="px-4 py-2">Telefone</th>
                                <th className="px-4 py-2">E-mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 && !loading && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-6 text-center text-gray-400"
                                    >
                                        Nenhum registro encontrado.
                                    </td>
                                </tr>
                            )}

                            {items.map((item) => (
                                <tr key={item.id} className="border-t border-gray-100">
                                    <td className="px-4 py-2 text-gray-500">
                                        {formatDate(item.created_at)}
                                    </td>
                                    <td className="px-4 py-2 font-medium text-gray-800">
                                        {item.name}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {item.cpf}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {item.phone}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {item.email}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                    Total exibido: {items.length}
                </div>
            </div>
        </div>
    );
}