import { Button, Card, ConfigProvider, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";

import template from "@/shared/templates/notification-setting.json";

import { DownloadModal } from "./components";
import { useInitPDFViewer, usePDFViewerHandlers } from "./hooks";

interface NotificationFormField {
  tips: string;
  contacts: string[];
}

export default function () {
  const navigate = useNavigate();
  const [form] = Form.useForm<NotificationFormField>();
  const { viewer, containerRef } = useInitPDFViewer({ template });
  const { savePDFChange, previewPDFContent } = usePDFViewerHandlers({
    template,
    viewer,
    containerRef,
  });
  const persistInputs = {
    property_name: "感谢会DSP",
    room_number: "101",
    room_number_2: "101",
    entry_group_code: JSON.stringify({ id: 123454, type: "entry_code_qr" }),
  };

  function generateInputs() {
    const values = form.getFieldsValue();
    const contacts = values.contacts
      .filter((contact) => contact?.label || contact?.content)
      .map((contact) => `${contact?.label ?? ""}: ${contact?.content ?? ""}`)
      .join("\n");
    return {
      tips: values.tips,
      contacts,
    };
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: { borderRadius: 2 },
          Input: { borderRadius: 2 },
          Form: { itemMarginBottom: 0 },
        },
      }}
    >
      <Card title="通知書設定" extra={<DownloadModal />}>
        <section className="flex flex-wrap justify-between gap-4 ">
          <div className="flex-0 basis-[37.5rem]">
            <section>
              <Title alert>注意事項</Title>
              <Form
                form={form}
                initialValues={{
                  tips: `■利用申請QRコードおよび解錠パスワードは、大切に保管してください。紛失した場合や漏洩した場合は速やかにお問い合わせ先までご連絡の上、再発行の手続きをおなってください。 
■同じお部屋に居住されている方がPabbitロッカーをご利用になりたい場合は、この通知書のQRコードの読み込みで利用申請できます。同一グループとなり荷物の共有ができます。 
■アプリダウンロード方法および利用申請方法は【スマートロック PP01A Pro取扱説明書】をご参照ください。

 ㈱PacPort 担当 ナギノ`,
                }}
              >
                <Form.Item name="tips">
                  <Input.TextArea
                    className="min-h-[280px] text-base"
                    showCount
                    rows={12}
                    maxLength={450}
                  />
                </Form.Item>
              </Form>
            </section>
            <section className="mt-6">
              <Title alert>お問い合わせ先</Title>
              <Form form={form} initialValues={{ contacts: [{}] }}>
                <Form.List name="contacts">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => {
                        return (
                          <Space size={16} key={field.key} className="mt-4">
                            <Form.Item name={[field.name, "label"]}>
                              <Input className="w-[9.75rem]" />
                            </Form.Item>
                            <Form.Item name={[field.name, "content"]}>
                              <Input allowClear className="w-[21rem]" />
                            </Form.Item>
                            {index === 0 ? (
                              <Button
                                className="ml-4"
                                type="primary"
                                onClick={add}
                              >
                                追加
                              </Button>
                            ) : (
                              <Button
                                className="ml-4"
                                danger
                                type="primary"
                                onClick={() => remove(field.name)}
                              >
                                削除
                              </Button>
                            )}
                          </Space>
                        );
                      })}
                    </>
                  )}
                </Form.List>
              </Form>
            </section>
          </div>
          <section className="basis-[25rem]">
            <Title>見本</Title>
            <div className="aspect-[13/9]" ref={containerRef}></div>
          </section>
        </section>

        <div className="mt-12 text-center">
          <Space size={16}>
            <Button onClick={() => navigate(-1)}>戻る</Button>
            <Button
              onClick={() => previewPDFContent(persistInputs, generateInputs())}
            >
              プレビュー
            </Button>
            <Button
              type="primary"
              onClick={() => {
                savePDFChange(persistInputs, generateInputs());
              }}
            >
              保存
            </Button>
          </Space>
        </div>
      </Card>
    </ConfigProvider>
  );
}

const Title = ({
  children,
}: {
  children?: string;
  className?: string;
  alert?: boolean;
}) => {
  return <header className="mb-4 text-base">{children}</header>;
};
