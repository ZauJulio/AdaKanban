export interface APIClientProps {
  resource: string;
  method: string;
  token: string | null;
  body?: any;
}

export default async function APIClient(props: APIClientProps) {
  const { resource, method, token, body } = props;

  const res = await fetch(`${process.env.API_URL}/${resource}/`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data;
}
