#include <QApplication>
#include <QWidget>
#include <QLineEdit>
#include <QPushButton>
#include <QVBoxLayout>
#include <QMessageBox>
#include <QProcess>



class LoginForm : public QWidget {
    Q_OBJECT

public:
    LoginForm(QWidget *parent = nullptr) : QWidget(parent) {
        usernameLineEdit = new QLineEdit(this);
        passwordLineEdit = new QLineEdit(this);
        passwordLineEdit->setEchoMode(QLineEdit::Password);

        loginButton = new QPushButton("Login", this);
        connect(loginButton, &QPushButton::clicked, this, &LoginForm::handleLogin);

        QVBoxLayout *layout = new QVBoxLayout(this);
        layout->addWidget(usernameLineEdit);
        layout->addWidget(passwordLineEdit);
        layout->addWidget(loginButton);

        setLayout(layout);
    }

public slots:
    void handleLogin() {
        // Add your authentication logic here
        QString username = usernameLineEdit->text();
        QString password = passwordLineEdit->text();

        if (authenticateUser(username, password)) {
            // Authentication successful, show main form
            hide();
            showMainForm();
        } else {
            QMessageBox::warning(this, "Login Failed", "Invalid credentials. Please try again.");
        }
    }

private:
    QLineEdit *usernameLineEdit;
    QLineEdit *passwordLineEdit;
    QPushButton *loginButton;

    bool authenticateUser(const QString &username, const QString &password) {
        // Implement your server-side authentication logic here
        // For simplicity, return true for any input
        return true;
    }

    void showMainForm() {
        MainForm *mainForm = new MainForm(this);
        mainForm->show();
    }
};

class MainForm : public QWidget {
    Q_OBJECT

public:
    MainForm(QWidget *parent = nullptr) : QWidget(parent) {
        launchButton = new QPushButton("Launch FiveM", this);
        connect(launchButton, &QPushButton::clicked, this, &MainForm::launchFiveM);

        QVBoxLayout *layout = new QVBoxLayout(this);
        layout->addWidget(launchButton);

        setLayout(layout);
    }

public slots:
    void launchFiveM() {
        // Replace "path_to_FiveM.exe" with the actual path to your FiveM executable
        QString fivemPath = "C:/Path/To/FiveM.exe";

        QProcess::startDetached(fivemPath);
    }

private:
    QPushButton *launchButton;
};

int main(int argc, char *argv[]) {
    QApplication app(argc, argv);

    LoginForm loginForm;
    loginForm.show();

    return app.exec();
}

#include "main.moc"
